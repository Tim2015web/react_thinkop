import styles from './Materials.module.scss';

export function MaterialsCard({ image, imageStyle, title,date }) {

  // Добавляем новый класс, если длина заголовка больше 35 символов
  const additionalClass = title.length > 35 ? styles.additionalClass : '';

  return (
    <div className={`${styles.materialsCard} ${additionalClass}`}>

      <div className={styles.materialsCard__image}>
        <img src={image} alt="" style={imageStyle} />
      </div>

      <div className={styles.materialsCard__title}>
        <h4>{title}</h4>
        <p>{date}</p>
      </div>

    </div>
  );
};