import styles from './App.module.css';
import powredImage from './assets/powered.png';
import leftArrowImage from './assets/leftarrow.png';
import { useState } from 'react';
import { levels, calculateIMC, Level } from './helpers/imc';
import { GridItem } from './components/GridItem';

const App = () => {
  const [heightField, setHeightField] = useState<number>(0);
  const [weightField, setWeightField] = useState<number>(0);
  const [showIMC, setShowIMC] = useState<Level | null>(null);

  const handleCalculateButton = () => {
    if (heightField && weightField) {
      setShowIMC(calculateIMC(heightField, weightField));
      return;
    }

    alert('Informe todos os campos');
  }

  const handleBackButton = () => {
    setShowIMC(null);
    setHeightField(0);
    setWeightField(0);
  }

  const disabledFields = showIMC ? true : false;

  return (
    <div className={styles.main}>
      <header>
        <div className={styles.headerContainer}>
          <img src={powredImage} alt="" width={150}/>
        </div>
      </header>
      <div className={styles.container}>
        <div className={styles.leftSide}>
          <h1>Calcule seu IMC</h1>
          <p>A OMS (Organização Mundial da Saúde) define o IMC como uma medida padronizada da relação entre o peso e a altura de um indivíduo. Segundo a OMS, o IMC é uma ferramenta útil para avaliar o estado nutricional de indivíduos e populações.</p>

          <input
            type="number"
            placeholder="Digite sua altura. Ex: 1.75 (em métros)"
            value={heightField > 0 ? heightField : ''}
            onChange={e => setHeightField(parseFloat(e.target.value))}
            disabled={disabledFields}
          />

          <input 
            type="number"
            placeholder="Digite seu peso. Ex: 65.3 (em kg)"
            value={weightField > 0 ? weightField : ''}
            onChange={e => setWeightField(parseFloat(e.target.value))}
            disabled={disabledFields}
          />

          <button onClick={handleCalculateButton} disabled={disabledFields}>Calcular</button>
        </div>
        <div className={styles.rightSide}>
            {
              !showIMC &&
              <div className={styles.grid}>
                {
                  levels.map((item, key) => (
                    <GridItem key={key} item={item} />
                  ))
                }
              </div>
            }
            {
              showIMC &&
              <div className={styles.rightBig}>
                <div className={styles.rightArrow} onClick={handleBackButton}>
                  <img src={leftArrowImage} alt="" width="25"/>
                </div>
                <GridItem item={showIMC} />
              </div>
            }
          </div>
        </div>
      </div>
  );
}

export default App;
