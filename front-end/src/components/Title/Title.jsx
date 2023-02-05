import React, { useState } from "react";
import "./Title.css";

function Title() {
  return (
    <div className="content">
      <div className="content__container">
        <p className="content__container__text">Hola!</p>

        <ul className="content__container__list">
          <li className="content__container__list__item">Discover</li>
          <li className="content__container__list__item">compare</li>
          <li className="content__container__list__item">Choose</li>
        </ul>
      </div>
    </div>
  );
}

export default Title;
