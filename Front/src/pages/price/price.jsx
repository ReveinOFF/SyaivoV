import { useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import "./priceStyle.scss";

const Price = () => {
  useEffect(() => {
    document.title = "Прайс";
  }, []);

  return (
    <>
      <div className="pages">
        <Link to="/">Головна</Link>
        <div>/</div>
        <NavLink to="/price">Прайс</NavLink>
      </div>

      <div>
        <h3>Список категорій:</h3>
        <ol>
          <li>
            <a href="#table1">Костюм робочий</a>
          </li>
          <li>
            <a href="#table2">Напівкомбінезон з курткою</a>
          </li>
          <li>
            <a href="#table3">Одяг для зварника</a>
          </li>
          <li>
            <a href="#table4">Одяг камуфльований</a>
          </li>
          <li>
            <a href="#table5">Одяг охоронних структур</a>
          </li>
          <li>
            <a href="#table6">Теплий одяг</a>
          </li>
          <li>
            <a href="#table7">Головні убори</a>
          </li>
          <li>
            <a href="#table8">Халати. Фартухи. Костюми жіночі.</a>
          </li>
          <li>
            <a href="#table9">Захист від води. Плащі.</a>
          </li>
          <li>
            <a href="#table10">Одяг сигнальний</a>
          </li>
          <li>
            <a href="#table11">Господарча гігієна</a>
          </li>
          <li>
            <a href="#table12">Рукавиці</a>
          </li>
          <li>
            <a href="#table13">Перчатки</a>
          </li>
          <li>
            <a href="#table14">Взуття. Напівчеревики. Черевики.</a>
          </li>
          <li>
            <a href="#table15">Взуття. Чоботи.</a>
          </li>
          <li>
            <a href="#table16">Взуття. Чоботи гумові</a>
          </li>
          <li>
            <a href="#table17">Взуття. Валянки</a>
          </li>
          <li>
            <a href="#table18">Засоби захисту. Органи дихання</a>
          </li>
          <li>
            <a href="#table19">Засоби захисту. Окуляри. Щитки</a>
          </li>
          <li>
            <a href="#table20">Засоби захисту. Діелектрика</a>
          </li>
          <li>
            <a href="#table21">Засоби захисту. Голова</a>
          </li>
          <li>
            <a href="#table22">Засоби захисту. Навушники</a>
          </li>
          <li>
            <a href="#table23">Засоби захисту. Пояси страхувальні</a>
          </li>
          <li>
            <a href="#table24">Пожежна безпека</a>
          </li>
          <li>
            <a href="#table25">Господарська група</a>
          </li>
        </ol>
      </div>

      <div className="table-container">
        <h3>Таблиці цін:</h3>

        <table id="table1">
          <tr>
            <th>Костюм робочий</th>
            <th>Ціна</th>
          </tr>
          <tr>
            <td>
              Костюм (куртка + штани) робочий Ки{" "}
              <span>/тка-на пе75% бав25%/</span>
            </td>
            <td>600</td>
          </tr>
        </table>
      </div>
    </>
  );
};

export default Price;
