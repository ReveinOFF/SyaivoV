import { Link, NavLink } from "react-router-dom";
import { useEffect } from "react";
import "./size-clothingStyle.scss";
import "../size-boots/size-bootsStyle.scss";

import Intersection from "../../../components/intersection/intersection";

const SizeCloth = () => {
  useEffect(() => {
    document.title = "Розміри одягу";
  }, []);

  return (
    <>
      <div className="pages">
        <Link to="/">Головна</Link>
        <div>/</div>
        <Link to="/size">Розміри</Link>
        <div>/</div>
        <NavLink to="/size/clothing">Одяг</NavLink>
      </div>

      <Intersection>
        <div className="table-container-cl">
          <h3 className="hidden">Таблиці розмірів одягу</h3>

          <div className="hidden">
            <div>
              Щоб вам було легше вибрати відповідний розмір, ми надаємо детальну
              таблицю розмірів для чоловіків і жінок.
            </div>

            <div>
              Для визначення разміру одягу для людей з стандартною фігурою
              потрібно виміряти зріст, обхват грудей, обхват бедер и обхват
              талії. Виміри проводять при мінімальній кількості одягу, які не
              змінюють форму и розміри тіла.
            </div>

            <div>
              В відповідності з замірами, для людей з стандартними фігурами, Вы
              можите визначити размір одягу по нижче наведених таблицях.
            </div>
          </div>

          <div className="category-price hidden">
            <h3>Список категорій:</h3>
            <ol>
              <li>
                <a href="#table1">Типові розміри для чоловіків</a>
              </li>
              <li>
                <a href="#table2">Типові розміри для жінок</a>
              </li>
              <li>
                <a href="#table3">Зріст</a>
              </li>
              <li>
                <a href="#table4">Розміри Європи</a>
              </li>
            </ol>
          </div>

          <h3 id="table1" className="hidden">
            Типові розміри для чоловіків:
          </h3>

          <div className="hiddenLeft">
            <table>
              <thead>
                <tr>
                  <th>Обхват грудей</th>
                  <th>Обхват талії</th>
                  <th>Обхват бедер</th>
                  <th>Розмір</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>84</td>
                  <td>72</td>
                  <td>88</td>
                  <td>42</td>
                </tr>
                <tr>
                  <td>88</td>
                  <td>76</td>
                  <td>92</td>
                  <td>44</td>
                </tr>
                <tr>
                  <td>92</td>
                  <td>80</td>
                  <td>96</td>
                  <td>46</td>
                </tr>
                <tr>
                  <td>96</td>
                  <td>84</td>
                  <td>100</td>
                  <td>48</td>
                </tr>
                <tr>
                  <td>100</td>
                  <td>88</td>
                  <td>104</td>
                  <td>50</td>
                </tr>
                <tr>
                  <td>104</td>
                  <td>92</td>
                  <td>108</td>
                  <td>52</td>
                </tr>
                <tr>
                  <td>108</td>
                  <td>96</td>
                  <td>112</td>
                  <td>54</td>
                </tr>
                <tr>
                  <td>112</td>
                  <td>100</td>
                  <td>116</td>
                  <td>56</td>
                </tr>
                <tr>
                  <td>116</td>
                  <td>104</td>
                  <td>120</td>
                  <td>58</td>
                </tr>
                <tr>
                  <td>120</td>
                  <td>108</td>
                  <td>124</td>
                  <td>60</td>
                </tr>
                <tr>
                  <td>124</td>
                  <td>112</td>
                  <td>128</td>
                  <td>62</td>
                </tr>
                <tr>
                  <td>128</td>
                  <td>116</td>
                  <td>132</td>
                  <td>64</td>
                </tr>
                <tr>
                  <td>132</td>
                  <td>120</td>
                  <td>136</td>
                  <td>66</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 id="table2" className="hidden">
            Типові розміри для жінок:
          </h3>

          <div className="hiddenLeft">
            <table>
              <thead>
                <tr>
                  <th>Обхват грудей</th>
                  <th>Обхват талії</th>
                  <th>Обхват бедер</th>
                  <th>Розмір</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>88</td>
                  <td>70</td>
                  <td>96</td>
                  <td>44</td>
                </tr>
                <tr>
                  <td>92</td>
                  <td>74</td>
                  <td>100</td>
                  <td>46</td>
                </tr>
                <tr>
                  <td>96</td>
                  <td>78</td>
                  <td>104</td>
                  <td>48</td>
                </tr>
                <tr>
                  <td>100</td>
                  <td>82</td>
                  <td>108</td>
                  <td>50</td>
                </tr>
                <tr>
                  <td>104</td>
                  <td>86</td>
                  <td>112</td>
                  <td>52</td>
                </tr>
                <tr>
                  <td>108</td>
                  <td>92</td>
                  <td>116</td>
                  <td>54</td>
                </tr>
                <tr>
                  <td>112</td>
                  <td>96</td>
                  <td>120</td>
                  <td>56</td>
                </tr>
                <tr>
                  <td>116</td>
                  <td>100</td>
                  <td>124</td>
                  <td>58</td>
                </tr>
                <tr>
                  <td>120</td>
                  <td>104</td>
                  <td>128</td>
                  <td>60</td>
                </tr>
                <tr>
                  <td>124</td>
                  <td>110</td>
                  <td>132</td>
                  <td>62</td>
                </tr>
                <tr>
                  <td>128</td>
                  <td>114</td>
                  <td>136</td>
                  <td>64</td>
                </tr>
                <tr>
                  <td>132</td>
                  <td>118</td>
                  <td>140</td>
                  <td>66</td>
                </tr>
                <tr>
                  <td>140</td>
                  <td>124</td>
                  <td>144</td>
                  <td>70</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 id="table3" className="hidden">
            Зріст:
          </h3>

          <div className="growth hiddenLeft">
            <table>
              <tbody>
                <tr>
                  <td>158</td>
                  <td>I</td>
                </tr>
                <tr>
                  <td>164</td>
                  <td>II</td>
                </tr>
                <tr>
                  <td>170</td>
                  <td>III</td>
                </tr>
                <tr>
                  <td>176</td>
                  <td>IV</td>
                </tr>
                <tr>
                  <td>182</td>
                  <td>V</td>
                </tr>
                <tr>
                  <td>188</td>
                  <td>VI</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="table-container">
          <h3 id="table4" className="hidden">
            Розміри Європи:
          </h3>

          <div className="hiddenLeft">
            <table>
              <thead>
                <tr>
                  <th>Розмір</th>
                  <th>Європейський розмір</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>44</td>
                  <td>S</td>
                </tr>
                <tr>
                  <td>46</td>
                  <td>M</td>
                </tr>
                <tr>
                  <td>48</td>
                  <td>L</td>
                </tr>
                <tr>
                  <td>50</td>
                  <td>XL</td>
                </tr>
                <tr>
                  <td>56</td>
                  <td>XXL</td>
                </tr>
                <tr>
                  <td>58</td>
                  <td>XXXL</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </Intersection>
    </>
  );
};

export default SizeCloth;
