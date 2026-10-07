"""Compara resultados exportados do TS com o código dos dois projetos Python.

Uso: python scripts/verificar-referencias.py [resultados-app.json]
Requer numpy, scipy e sympy. Os projetos de referência são pastas irmãs.
Executa as funções de controlador/lgr.py e, por AST, o bloco real de projeto
de projeto-controladores/app.py. Apenas as chamadas de apresentação Streamlit
são substituídas. Não inicializa interfaces nem altera os projetos de origem.
"""
import ast
import json
import math
import sys
import subprocess
from pathlib import Path

import numpy as np
import sympy as sp
import scipy
from scipy.signal import TransferFunction, step

ROOT = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(ROOT / 'controlador'))
import lgr


class Apresentacao:
    def __enter__(self): return self
    def __exit__(self, *args): return False
    def columns(self, n): return [self] * n
    def __getattr__(self, name):
        if name == 'error':
            def error(message): raise RuntimeError(message)
            return error
        return lambda *args, **kwargs: self


SOURCE = ROOT / 'projeto-controladores' / 'app.py'
TREE = ast.parse(SOURCE.read_text())
HELPERS = [n for n in TREE.body if isinstance(n, ast.FunctionDef) and n.name in {'calc_zeta', 'format_complex'}]
CALCULAR = next(n for n in TREE.body if isinstance(n, ast.If) and ast.unparse(n.test) == 'calcular')
BODY = CALCULAR.body[1].body
# Executa desde o parsing até a discretização, antes da simulação com control.
STOP = next(i for i, n in enumerate(BODY) if isinstance(n, ast.Expr) and isinstance(n.value, ast.Call)
            and n.value.args and isinstance(n.value.args[0], ast.Constant)
            and str(n.value.args[0].value).startswith('Passo 5:'))
PROGRAM = compile(ast.Module(body=HELPERS + [CALCULAR.body[0]] + BODY[:STOP], type_ignores=[]), str(SOURCE), 'exec')


def expressao(tf, s):
    def poly(coefs): return sum(sp.Float(c, 17) * s**(len(coefs)-1-i) for i, c in enumerate(coefs))
    return poly(tf['num']) / poly(tf['den'])


def executar_app(entrada, discreto=None):
    s = sp.Symbol('s'); e = entrada['especificacao']
    env = {'np': np, 'sp': sp, 'math': math, 'st': Apresentacao(),
           'G_str': str(expressao(entrada['G'], s)), 'H_str': str(expressao(entrada['H'], s)),
           'req_type': {'mpTs':'Overshoot (MP) e Tempo (ts)', 'zetaWn':'Zeta e Wn explícitos', 'polo':'Pólos explícitos'}[e['modo']],
           'ctrl_type': {'PD':'PD','PI':'PI','PID':'PID (Zeros iguais)'}[entrada['topologia']],
           'ts_crit': str(e.get('faixa',5))+'%', 'mp_val':e.get('mp',10), 'ts_val':e.get('ts',4),
           'zeta_val':e.get('zeta',.7), 'wn_val':e.get('wn',.5),
           'real_part':e.get('re',-4), 'imag_part':e.get('im',4), 'disc_type':'Nenhum'}
    if discreto:
        env.update(disc_type='Euler' if discreto['metodo']=='forward' else 'Tustin', T_val=discreto['T'],
                   disc_target='Apenas o Controlador Gc(s)' if discreto['alvo']=='Gc' else 'Modelo Completo')
    exec(PROGRAM, env)
    return env


def tf_expr(expr, s):
    n,d=sp.fraction(sp.cancel(expr))
    return np.array(sp.Poly(n,s).all_coeffs(),dtype=float), np.array(sp.Poly(d,s).all_coeffs(),dtype=float)


def medir_y(y, t, yss):
    def ts(tol):
        outside=np.flatnonzero(np.abs(y-yss)>tol*abs(yss))
        return None if len(outside) and outside[-1]==len(y)-1 else float(t[outside[-1]+1]) if len(outside) else 0.
    return {'mp':float(max(0,np.max(np.sign(yss)*(y-yss)))/abs(yss)*100), 'ts2':ts(.02),'ts5':ts(.05)}


def comparar(path):
    raw=Path(path).read_text() if path else subprocess.run(
        ['node','scripts/exportar-referencias.mjs'], cwd=Path(__file__).resolve().parents[1],
        check=True, capture_output=True, text=True).stdout
    data=json.loads(raw); report=[]; t=np.linspace(0,20,4001)
    for app in data['results']:
        e=app['entrada']; sd=complex(app['sd']['re'],app['sd']['im'])
        projeto={'PD':lgr.projeto_PD,'PI':lgr.projeto_PI,'PID':lgr.projeto_PID_zigual}[e['topologia']]
        ref=projeto(e['G']['num'],e['G']['den'],e['H']['num'],e['H']['den'],sd)
        env=executar_app(e); n2,d2=tf_expr(env['Gc_final'],env['s'])
        n1,d1=lgr.malha_fechada(e['G']['num'],e['G']['den'],e['H']['num'],e['H']['den'],ref['Gc_num'],ref['Gc_den'])
        n2f,d2f=lgr.malha_fechada(e['G']['num'],e['G']['den'],e['H']['num'],e['H']['den'],n2,d2)
        _,y1=step(TransferFunction(n1,d1),T=t); _,y2=step(TransferFunction(n2f,d2f),T=t)
        error_gain1=abs(app['Kc']-ref['Kc']); error_gain2=abs(app['Kc']-env['Kc_val'])
        assert np.isclose(app['z'],ref.get('z',ref.get('z1')),rtol=1e-9,atol=1e-9)
        assert np.isclose(app['z'],env['zc_val'],rtol=1e-9,atol=1e-9)
        assert np.isclose(app['Kc'],ref['Kc'],rtol=1e-9,atol=1e-9)
        assert np.isclose(app['Kc'],env['Kc_val'],rtol=1e-9,atol=1e-9)
        for name in ['Kp','Ki','Kd']:
            assert np.isclose(app[name],ref.get(name,0),rtol=1e-9,atol=1e-9)
        np.testing.assert_allclose(np.array(app['Gc']['num'])/app['Gc']['den'][0],n2/d2[0],rtol=1e-9,atol=1e-9)
        roots1=np.roots(d1); roots2=np.roots(d2f)
        for root in app['polos']:
            p=complex(root['re'],root['im'])
            assert min(abs(roots1-p))<1e-7 and min(abs(roots2-p))<1e-7
        samples=np.array(app['resposta']['amostras'])
        err1=float(np.max(abs(samples-y1[data['indices']]))); err2=float(np.max(abs(samples-y2[data['indices']])))
        assert err1<1e-6 and err2<1e-6
        for disc in app['discretizacoes']:
            d_env=executar_app(e,disc)
            z=d_env['z']; result_expr=d_env['Gc_z'] if disc['alvo']=='Gc' else d_env['G_comp_z']
            if disc['alvo']=='Gc': cn,cd=ref['Gc_num'],ref['Gc_den']
            else:
                ng,dg=lgr.tf_mul(e['G']['num'],e['G']['den'],e['H']['num'],e['H']['den'])
                cn,cd=lgr.tf_mul(ng,dg,ref['Gc_num'],ref['Gc_den'])
            nz,dz=(lgr.c2d_euler if disc['metodo']=='forward' else lgr.c2d_tustin)(cn,cd,disc['T'])
            for point in [.7+.2j,1.3+.7j,-.5+.4j]:
                value=np.polyval(disc['num'],point)/np.polyval(disc['den'],point)
                assert np.isclose(value,np.polyval(nz,point)/np.polyval(dz,point),rtol=1e-8,atol=1e-8)
                assert np.isclose(value,complex(result_expr.subs(z,point).evalf()),rtol=1e-8,atol=1e-8)
        native=lgr.metricas_step(n1,d1,t_max=20,n_pts=4001)
        report.append({'questao':app['id'],'z':app['z'],'Kc':app['Kc'],'Kp':app['Kp'],'Ki':app['Ki'],'Kd':app['Kd'],
                       'erro_Kc_controlador':error_gain1,'erro_Kc_projeto_controladores':float(error_gain2),
                       'erro_amostras_controlador':err1,'erro_amostras_projeto_controladores':err2,
                       'metricas_app':app['resposta'],'metricas_mesma_convencao':medir_y(y1,t,float(n1[-1]/d1[-1])),
                       'metricas_nativas_controlador':{k:native[k] for k in ['Mp','ts2','ts5','yss']},
                       'discretizacoes_conferidas':len(app['discretizacoes'])})
    # Executa também os padrões originais da questão 4, sem corrigi-los.
    original=json.loads(json.dumps(data['results'][3]['entrada']))
    presets=next(n for n in TREE.body if isinstance(n,ast.If) and ast.unparse(n.test).startswith("modo == 'Questão 1"))
    defaults={'modo':'Questão 4 (PID, Mp, ts)'}
    exec(compile(ast.Module(body=[presets],type_ignores=[]),str(SOURCE),'exec'),defaults)
    s=sp.Symbol('s'); hn,hd=tf_expr(sp.sympify(defaults['def_H']),s)
    original['H']={'num':hn.tolist(),'den':hd.tolist()}
    criterios=next(n for n in ast.walk(TREE) if isinstance(n,ast.Call) and isinstance(n.func,ast.Attribute)
                  and n.func.attr=='radio' and n.args and isinstance(n.args[0],ast.Constant) and n.args[0].value=='Critério de ts')
    faixa=int(ast.literal_eval(criterios.args[1])[0].replace('%',''))
    original['especificacao'].update(mp=defaults['def_mp'],ts=defaults['def_ts'],faixa=faixa)
    env=executar_app(original)
    output={'versoes':{'numpy':np.__version__,'scipy':scipy.__version__,'sympy':sp.__version__},'questoes':report,
            'template_original_q4':{'H':defaults['def_H'],'faixa':faixa,'sd':str(env['s_d']),'z':float(env['zc_val']),'Kc':float(env['Kc_val'])}}
    print(json.dumps(output,indent=2))


if __name__=='__main__': comparar(sys.argv[1] if len(sys.argv)>1 else None)
