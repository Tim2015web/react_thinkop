import styles from './Materials.module.scss';
import { MaterialsCard } from './MaterialsCard';

import data from '../../mockData.js'; // Импортируем mockData
import { useRef } from 'react';

export function Materials() {

  let arrayTitle = [
    'Как повысить удои коров',
    'Как повысить удои коров',
    'Как повысить удои коров: факторы, от которых зависит молочная продуктивность',
    'Как повысить удои коров',
    'Как добиться высокого прироста поросят'
  ];

  // ---Генерация случайных бордеров
  // Не совсем понятно - "Круг или лепесток определяется рандомно, но важно, чтобы 2 круга не стояли друг рядом с другом."
  // Поэтому реализована логика рандомных бордеров, но что бы подряд двух одинаковых небыло
  let arrayStyles = [];
  for (let i = 0; i < data.length; i++) { // Цикл ограничен количеству элементов в mockData
    // Получаем предыдущее значение 'borderRadius' или устанавливаем в null, если это первый элемент
    let prev = i > 0 ? arrayStyles[i - 1]['borderRadius'] : null;
    let r1, r2;
    do {
      // Алгоритм рандомных радиусов от 0% до 50%
      r1 = Math.floor(Math.random() * 6) * 10;
      r2 = Math.floor(Math.random() * 6) * 10;
      // Повторяем генерацию, пока не получим уникальную комбинацию
    } while (`${r1}% ${r2}%` === prev);
    // Создаем объект стиля с уникальной комбинацией 'borderRadius'
    let style = { 'borderRadius': `${r1}% ${r2}%` };
    // Добавляем объект стиля в массив
    arrayStyles.push(style);
  }

  //Что нужно сделать - если ширина экрана меньше 404px, то шаг прокрутки нужно расчитать так: ширина экрана - 60px

  // ---Прокрутка по клику, шаг 344px
  // Если ширина экрана меньше 404px, то применяем формулу для расчета адекватной прокрутки 
  const cardsContainerRef = useRef(null);
  const handlePrevSlide = () => {
    const step = window.innerWidth < 404 ? window.innerWidth - 60 : 344;
    if (cardsContainerRef.current) { cardsContainerRef.current.scrollLeft -= step; }
  };
  const handleNextSlide = () => {
    const step = window.innerWidth < 404 ? window.innerWidth - 60 : 344;
    if (cardsContainerRef.current) { cardsContainerRef.current.scrollLeft += step; }
  };

  return (
    <div className={styles.materials}>
      <div className="container">
        <div className={styles.wrapper}>

          <div className={styles.title}>
            <h1>Полезные материалы</h1>
            <p>
              Собрали для вас полезные исследования схемы кормления и другие материалы, которые пригодятся для лучших результатов на вашем хозяйстве
            </p>
          </div>

          <div className={styles.cards} ref={cardsContainerRef}>

            {data.map((item, index) => (
              <MaterialsCard
                key={item.id}
                image={item.img}
                imageStyle={arrayStyles[index]}
                title={arrayTitle[index]}
                // title={item.title}  Код на случай, если title все таки идет из mockData
                date={item.date}
              />
            ))}

          </div>

          <div className={styles.controllers}>
            {/* Элементы в виде svg, что бы легче манипулировать свойствами */}
            <svg onClick={handlePrevSlide} width="173" height="23" viewBox="0 0 173 23" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g id="Group 917">
                <rect id="Rectangle 403" x="1" y="10" width="172" height="2.99998" fill="#C9D0E1" />
                <path id="Vector 8" d="M12 0V0C12 6.07513 7.07513 11 0.999998 11L-1.33918e-06 11" stroke="#C9D0E1"
                  strokeWidth="3" />
                <path id="Vector 9" d="M12 23V23C12 16.9249 7.07513 12 1 12L6.11999e-07 12" stroke="#C9D0E1" strokeWidth="3" />
              </g>
            </svg>

            <svg onClick={handleNextSlide} width="173" height="23" viewBox="0 0 173 23" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g id="Group 917">
                <rect id="Rectangle 403" width="172" height="2.99998" transform="matrix(-1 8.74228e-08 8.74228e-08 1 172 10)"
                  fill="#C9D0E1" />
                <path id="Vector 8" d="M161 0V0C161 6.07513 165.925 11 172 11L173 11" stroke="#C9D0E1" strokeWidth="3" />
                <path id="Vector 9" d="M161 23V23C161 16.9249 165.925 12 172 12L173 12" stroke="#C9D0E1" strokeWidth="3" />
              </g>
            </svg>
          </div>

        </div>
      </div>
    </div>
  );
};

// Ход мыслей (немного текста).

// Не совсем понятно как именно должны приходить названия материалов. В mockData их нет. Свойство title: 'usefulMaterial' возможно и является названием материала, а возможно одна из категорий статей. В любом случае длины этого названия не хватит для того, что бы проверить логику - "В случае, если название материала включает в себя больше 35 символов, он занимает 2 ячейки слайдера, в ином случае одну".

// Варианты решения проблемы: 1. Добавить в title названия материалов из макета; 2. Добавить новой свойство в mockData с названиями; 3. Вынести получения названий материалов в отдельную логику и не изменять входные данные; 4. В разметке добавлять каждому материалу название вручную.

// Выберу 3 вариант. Таким образом сохраним целостность входных данных и реализуем цикличное построение разметки, что бы сохранить возможное масштабирование компонента.

// В реальных условиях этот момент стоило бы уточнить у человека, который поставил задачу.

// Прочитавшему - Мира, добра и печенек :)