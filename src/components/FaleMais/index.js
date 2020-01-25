import React, { useState } from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import './style.css';

export default function FaleMais() {
  const [origin, setOrigin] = useState();
  const [destiny, setDestiny] = useState('16');
  const [total, setTotal] = useState(0);
  const [totalSemFale, setTotalSemFale] = useState(0);
  const [time, setTime] = useState(0)
  const [faleMais30, setFaleMais30] = useState(0);
  const [selectFaleMais, setSelectFaleMais] = useState('30');

  function withoutFaleMais() {

    function calculationPrice() {
      const originNum = parseFloat(origin);
      const destinyNum = parseFloat(destiny);

      if (originNum === 11 && destinyNum === 16) { setTotal(1.90) }
      if (originNum === 16 && destinyNum === 11) { setTotal(2.90) }
      if (originNum === 11 && destinyNum === 17) { setTotal(1.70) }
      if (originNum === 17 && destinyNum === 11) { setTotal(2.70) }
      if (originNum === 11 && destinyNum === 18) { setTotal(0.90) }
      if (originNum === 18 && destinyNum === 11) { setTotal(1.90) }

    }

    function totalTime() {
      const totalPrice = parseFloat(total);
      const totalTime = parseFloat(time);
      setTotalSemFale(totalPrice * totalTime);
    }
    calculationPrice();
    totalTime();
  }

  function withFaleMais() {
    withoutFaleMais();

    const numberFaleMais = parseFloat(selectFaleMais);
    const timeNum = parseFloat(time);
    const totalNum = parseFloat(total);
    if (numberFaleMais === 30) { timeNum < 31 ? setFaleMais30(0) : setFaleMais30((time - 30) * ((totalNum * 0.10) + totalNum)) }
    if (numberFaleMais === 60) { timeNum < 61 ? setFaleMais30(0) : setFaleMais30((time - 60) * ((totalNum * 0.10) + totalNum)) }
    if (numberFaleMais === 120) { timeNum < 121 ? setFaleMais30(0) : setFaleMais30((time - 120) * ((totalNum * 0.10) + totalNum)) }

  }

  return (
    <>
      <Container className="container-border">
        <Row>
          <Col>
            <div >
              <label className="title">Origem do DDD:</label>
              <select className="option-input" onChange={(event) => setOrigin(event.target.value)}>
                <option value="">  </option>
                <option value="11" defaultValue>011</option>
                <option value="16">016</option>
                <option value="17">017</option>
                <option value="18">018</option>
              </select>
            </div>
          </Col>
          <Col>
            {
              origin === "11" ?
                <>
                  <label className="title">Destino do DDD:</label>
                  <select className="option-input" name="destiny" id="" onChange={(event) => setDestiny(event.target.value)}>
                    <option value="16"></option>
                    <option value="16">016</option>
                    <option value="17">017</option>
                    <option value="18">018</option>
                  </select>
                </>
                : origin === "16" ?
                  <>
                    <label className="title">Destino do DDD:</label>
                    <select className="option-input" name="destiny" id="" onChange={(event) => setDestiny(event.target.value)}>
                      <option value="">  </option>
                      <option value="11">011</option>
                    </select>
                  </>
                  : origin === "17" ?
                    <>
                      <label className="title">Destino do DDD:</label>
                      <select className="option-input" name="destiny" id="" onChange={(event) => setDestiny(event.target.value)}>
                        <option value="">  </option>
                        <option value="11">011</option>
                      </select>
                    </>
                    : origin === "18" ?
                      <>
                        <label className="title">Destino do DDD:</label>
                        <select className="option-input" name="destiny" id="" onChange={(event) => setDestiny(event.target.value)}>
                          <option value="">  </option>
                          <option value="11">011</option>>
                        </select>
                      </> :
                      <label className="title">Destino do DDD:</label>
            }
          </Col>
          <Col>
            <label className="title">Tempo em Minutos: </label>
            <input className="option-input option-input-time" type="text" value={time} onChange={(event) => setTime(event.target.value)} />
          </Col>
          <Col>
            <label className="title">Plano FaleMais:</label>
            <select className="option-input" name="selectFaleMais" onChange={(event) => setSelectFaleMais(event.target.value)}>
              <option value="30">FaleMais30</option>
              <option value="60">FaleMais60</option>
              <option value="120">FaleMais120</option>
            </select>
          </Col>
          <Col>
            <label className="title">{`Com FaleMais${parseFloat(selectFaleMais)}: `}</label>
            {
              faleMais30 !== undefined ? <input className="option-input option-input-with" type="text" value={`R$${faleMais30.toFixed(2).replace('.', ',')}`} />
                : <input className="option-input option-input-with" type="text" value={`R$0,00`} />
            }
          </Col>
          <Col>
            <label className="title">Sem FaleMais: </label>
            {
              total !== undefined ? <input className="option-input option-input-without" type="text" value={`R$${totalSemFale.toFixed(2).replace('.', ',')}`} />
                : <input className="option-input option-input-without" type="text" value={`R$0,00`} />
            }
          </Col>
        </Row>
      </Container>
      <div >
        <button onClick={withFaleMais}>Calcular</button>
      </div>
    </>
  )
}