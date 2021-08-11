import {useEffect, useRef, useState} from "react";
import {connect} from 'react-redux';
import {addReview} from "../../store/action";
import React from 'react';
import PropTypes from 'prop-types';
import FormRating from "../form-rating/form-rating";
const FormReviewModal = ({closeModal}) => {
  let userData;
  const ESC_KEY = `Escape`;
  const formRef = useRef();
  const [focused, setFocused] = useState(false);
  const initialFormState = {
    user: ``,
    pros: ``,
    cons: ``,
    rating: 0,
    comment: ``,
    date: `1`
  };

  const [currentFormState, setCurrentFormState] = useState({...initialFormState});

  console.log(`currentFormState.rating 0`, currentFormState.rating);
  let handleMousedownForm = (evt) => {
    if (!formRef.current.contains(evt.target)) {
      closeModal();
    }
  };

  const handleInputChange = (evt) => {
    setCurrentFormState({
      ...currentFormState,
      [evt.target.name]: evt.target.value,
    });
  };

  const handleFormRatingInput = (evt) => {
    setCurrentFormState({
      ...currentFormState,
      rating: parseInt(evt.target.value, 10),
    });
    console.log(`currentFormState.rating`, currentFormState.rating);
  };
  const handleSubmit = (evt) => {
    evt.preventDefault();
    console.log(`currentFormState.user.length`, currentFormState.user.length);
    console.log(`focused`, focused);
    if (currentFormState.user.length === 0 || currentFormState.comment.length === 0) {
      console.log(`hola`);
      setFocused(true);
    } else {
      addReview(currentFormState);
      setCurrentFormState({
        ...initialFormState,
      });
      closeModal();
    }

  };
  const handleEscapeKeyForm = (evt) => {
    if (evt.key === ESC_KEY) {
      closeModal();
    }
  };

  useEffect(() => {
    userData = JSON.parse(localStorage.getItem(`myValueInLocalStorage`));
    if (localStorage.getItem(`myValueInLocalStorage`)) {
      setCurrentFormState({
        user: userData.user,
        pros: userData.pros,
        cons: userData.cons,
        rating: userData.rating,
        comment: userData.comment,
        date: `1`,
      });
    } else {
      setCurrentFormState({...initialFormState});
    }
  }, [userData]);

  useEffect(() => {
    localStorage.setItem(`myValueInLocalStorage`, JSON.stringify(currentFormState));
  });

  useEffect(() => {
    document.addEventListener(`keydown`, handleEscapeKeyForm);
    document.addEventListener(`mousedown`, handleMousedownForm);
    return () => {
      document.removeEventListener(`mousedown`, handleMousedownForm);
      document.removeEventListener(`keydown`, handleEscapeKeyForm);
    };
  });
  return <>
    <div className="modal modal--show">
      <div ref={formRef} className="modal__main">
        <h3 className="title form-review__title">Оставьте отзыв</h3>
        <form
          className="modal__form form-review"
          action="#"
          onSubmit={handleSubmit}
        >
          <div className="form-review__container">
            <div className="form-review__wrapper">
              <div className={`form-rieview__features form-review__required ${focused ? `form-review__required--active` : ``}`}>
                <label htmlFor="userName"></label>
                <input
                  className={`form-review__input ${focused ? `form-review__input--focused` : ``}`}
                  id="userName"
                  type="text"
                  name="user"
                  // autoFocus={true}
                  placeholder="Имя"
                  // required
                  // onFocus={() => setFocused(true)}
                  value={currentFormState.user}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-rieview__features">
                <label htmlFor="pros"></label>
                <input
                  className="form-review__input"
                  id="pros"
                  type="text"
                  name="pros"
                  placeholder="Достоинства"
                  value={currentFormState.pros}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-rieview__features">
                <label htmlFor="cons"></label>
                <input
                  className="form-review__input"
                  id="cons"
                  type="text"
                  placeholder="Недостатки"
                  name="cons"
                  value={currentFormState.cons}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="form-review__wrapper form-review__wrapper--column">
              <div className="form-review__rating rating">
                <span className="form-review__label rating__label">Оцените товар:</span>
                <FormRating ratingValue={currentFormState.rating} handleFormRatingInput={handleFormRatingInput}/>
              </div>
              <div className={`form-review__textarea form-review__required ${focused ? `form-review__required--active` : ``}`}>
                <label htmlFor="comments"></label>
                <textarea
                  className={`form-review__comments ${focused ? `form-review__input--focused` : ``}`}
                  id="comments"
                  placeholder="Комментарий"
                  name="comment"
                  value={currentFormState.comment}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
          <button
            className="form-review__button"
            type="submit"
          >оставить отзыв
          </button>
        </form>
        <button
          className="modal__button-close"
          onClick={closeModal}>
          <svg className="modal__button-svg" width="15" height="16" viewBox="0 0 15 16">
            <path d="M13.6399 15.0096L7.50482 8.86495L1.36977 15.0096L0 13.6399L6.14469 7.50482L0 1.36978L1.36977 0L7.50482 6.14469L13.6399 0.00964652L15 1.36978L8.86495 7.50482L15 13.6399L13.6399 15.0096Z"/>
          </svg>
        </button>
      </div>
    </div>
  </>;
};

FormReviewModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
};

export {FormReviewModal};
export default connect(null, null)(FormReviewModal);
