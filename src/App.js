import logo from './logo.svg';
import './App.css';
import React from 'react';
import { useState } from 'react';
import { type } from '@testing-library/user-event/dist/type';

function App() {

    const [valor, setValor] = useState('0');
    const [dark, setDark] = useState(0);

    function darkMode(d) {
        const h3 = document.querySelector('#h3-dark-mode');

        let calculadora = document.querySelector('.calculadora');
        let display = document.querySelector('.calculadora-display');
        let numeros = document.querySelectorAll('.calculadora-numeros-botao');
        let operacoes = document.querySelectorAll('.calculadora-operacoes-botao');
        let resultado = document.querySelector('.botao-resultado');
        let limpar = document.querySelector('.botao-limpar');
        const switch_btn = document.querySelector('.switch');


        if(d == 0){
            h3.style.color = '#00B0FF';
            h3.classList.add('text-neon');

            switch_btn.style.border = '1px solid #00B0FFe0';

            numeros.forEach(n => {
                n.classList.add('dark-numeros');
            });

            operacoes.forEach(op => {
                op.classList.add('dark-operacoes');
            });

            resultado.classList.add('dark-resultado');
            limpar.classList.add('dark-limpar');
            display.classList.add('dark-display');
            calculadora.classList.add('dark-calculadora');
            document.body.style.background = '#1B1D27';
            
        } else {
            h3.style.color = '#444';
            h3.classList.remove('text-neon');

            switch_btn.style.border = 'none';

            numeros.forEach(n => {
                n.classList.remove('dark-numeros');
            });

            operacoes.forEach(op => {
                op.classList.remove('dark-operacoes');
            });
            
            resultado.classList.remove('dark-resultado');
            limpar.classList.remove('dark-limpar');
            display.classList.remove('dark-display');
            calculadora.classList.remove('dark-calculadora');
            document.body.style.background = '#fff';
        }
    }

    function darkToggle(){
        setDark(!dark);
        dark == 1 ? darkMode(1) : darkMode(0);
    }

    function valorEhZero() {
        let ehZero = valor == 0 ? true : false;
        return ehZero;
    }

    function operacaoAdicionada() {
        let val = valor.toString();
        if (val.indexOf('/') == -1 && val.indexOf('*') == -1 && val.indexOf('-') == -1 && val.indexOf('+') == -1) {
            return false;
        } return true;
    }

    function verificaOperacao() {
        let operacao = false;

        if (valor.indexOf('/') != -1) {
            operacao = '/';
        } else if (valor.indexOf('*') != -1) {
            operacao = '*';
        } else if (valor.indexOf('-') != -1) {
            operacao = '-';
        } else if (valor.indexOf('+') != -1) {
            operacao = '+';
        }

        return operacao;
    }

    function atingiuLimiteDoDisplay() {
        if (valor.length == 26) {
            alert('Limite de caractéres excedido...');
            return true;
        } return false;
    }

    function temOperacao1IndiceAtras() {
        let v1 = valor[valor.length - 1];

        if (v1 == '/' || v1 == '*' || v1 == '-' || v1 == '+' || v1 == ' ') {
            return true
        } else return false
    }

    function insereDigito(numero) {

        if (!atingiuLimiteDoDisplay()) {
            let v = valor[valor.length - 1];
            let v2 = valor[valor.length - 2];

            if (valorEhZero()) {
                setValor(numero);
            }
            else if ((v == 0 || v == ' ') && operacaoAdicionada() && temOperacao1IndiceAtras()) {
                if (numero == 0) {
                    setValor((valor + '0'));
                } else {
                    setValor(valor + '' + numero);
                }

            }
            else if ((v == 0 && v2 == ' ') && operacaoAdicionada()) {
                setValor((valor.slice(0, -1) + numero));
            }
            else if (!valorEhZero()) {
                setValor(valor + '' + numero);
            }
        }
    }
    function insereOperacao(operacao) {
        if (!atingiuLimiteDoDisplay()) {


            if (valor != 0 && valor.length != 0) {

                if (!operacaoAdicionada()) {
                    setValor(valor + ' ' + operacao + ' ');
                } else {
                    resultado(operacao);
                }

            }
        }
    }

    function limparTela() {
        setValor('0');
    }

    function resultado(op = '') {

        if (!valorEhZero()) {
            let operacao = verificaOperacao();
            let valores = valor.split(operacao);

            setValor(eval(valores[0] + operacao + valores[1]) + ' ' + op + ' ');


        }
    }

    return (
        <div className='container flex'>
            <h3 id='h3-dark-mode'>Dark mode</h3>

            <label className='switch'>
                <input onClick={darkToggle} name='dark-check' type="checkbox" />
                <span className='slider'></span>
            </label>

            <div className='calculadora flex shadow'>
                <div className='calculadora-display flex'>
                    <p>{valor}</p>
                </div>
                <div className='duas-areas flex'>
                    <div className='calculadora-numeros flex'>
                        <div className='calculadora-numeros-linha flex'>
                            <button onClick={() => insereDigito(7)} className='calculadora-numeros-botao shadow'>7</button>
                            <button onClick={() => insereDigito(8)} className='calculadora-numeros-botao shadow'>8</button>
                            <button onClick={() => insereDigito(9)} className='calculadora-numeros-botao shadow'>9</button>
                        </div>
                        <div className='calculadora-numeros-linha flex'>
                            <button onClick={() => insereDigito(4)} className='calculadora-numeros-botao shadow'>4</button>
                            <button onClick={() => insereDigito(5)} className='calculadora-numeros-botao shadow'>5</button>
                            <button onClick={() => insereDigito(6)} className='calculadora-numeros-botao shadow'>6</button>
                        </div>
                        <div className='calculadora-numeros-linha flex'>
                            <button onClick={() => insereDigito(1)} className='calculadora-numeros-botao shadow'>1</button>
                            <button onClick={() => insereDigito(2)} className='calculadora-numeros-botao shadow'>2</button>
                            <button onClick={() => insereDigito(3)} className='calculadora-numeros-botao shadow'>3</button>
                        </div>
                        <div className='calculadora-numeros-linha flex'>
                            <button onClick={() => insereDigito(0)} className='calculadora-numeros-botao shadow'>0</button>
                            {/* <button onClick={() => insereDigito('.')} className='calculadora-numeros-botao shadow'>.</button> */}
                        </div>
                    </div>
                    <div className='calculadora-operacoes flex'>
                        <div className='calculadora-operacoes-linha flex'>
                            <button onClick={() => insereOperacao('/')} className='calculadora-operacoes-botao flex shadow'>/</button>
                            <button onClick={() => insereOperacao('*')} className='calculadora-operacoes-botao flex shadow'>*</button>
                            <button onClick={() => insereOperacao('-')} className='calculadora-operacoes-botao flex shadow'>-</button>
                            <button onClick={() => insereOperacao('+')} className='calculadora-operacoes-botao flex shadow'>+</button>
                            <button onClick={() => resultado()} className='calculadora-operacoes-botao botao-resultado flex shadow'>=</button>
                            <button onClick={() => limparTela()} className='calculadora-operacoes-botao botao-limpar shadow'>C</button>
                        </div>
                    </div>
                </div>

            </div>

        </div >
    );
}

export default App;