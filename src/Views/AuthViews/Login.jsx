import React, { useState } from 'react';
import './AuthStyles/Login.css'
import { useAuthContext } from '../../Context/AuthProvider.jsx';
import {validateEmail,validatePasswordLength} from '../../Utils/Functions.jsx'
import { Link } from 'react-router-dom';

const Login = () => {
  const [isvalideField, setIsValidField] = useState({
    email: true,
    password:true
  })

const {loginForm,setLoginForm,handleLoginPost,incorrectAuth,} = useAuthContext()
  const onChange = (e) => {
    
    const { value,name } = e.target 
    setLoginForm((prev) => ({ ...prev, [name]: value }))
    if(name=="email")
    setIsValidField(prev=>({...prev,email:validateEmail(value)}))
    else   setIsValidField(prev=>({...prev,password:validatePasswordLength(value)}))


  }


  return (
    
    <div className="login-root">
    <div
      className="box-root flex-flex flex-direction--column"
      style={{ minHeight: "100vh", flexGrow: 1 }}
    >
      <div className="loginbackground box-background--white padding-top--64">
        <div className="loginbackground-gridContainer">
          <div
            className="box-root flex-flex"
            style={{ gridArea: "top / start / 8 / end" }}
          > 
            <div
              className="box-root"
              style={{
                backgroundImage:
                  "linear-gradient(white 0%, rgb(247, 250, 252) 33%)",
                flexGrow: 1,
              }}
            ></div>
          </div>
          <div
            className="box-root flex-flex"
            style={{ gridArea: "4 / 2 / auto / 5" }}
          >
            <div
              className="box-root box-divider--light-all-2 animationLeftRight tans3s"
              style={{ flexGrow: 1 }}
            ></div>
          </div>
          <div
            className="box-root flex-flex"
            style={{ gridArea: "6 / start / auto / 2" }}
          >
            <div
              className="box-root box-background--blue800"
              style={{ flexGrow: 1 }}
            ></div>
          </div>
          <div
            className="box-root flex-flex"
            style={{ gridArea: "7 / start / auto / 4" }}
          >
            <div
              className="box-root box-background--blue animationLeftRight"
              style={{ flexGrow: 1 }}
            ></div>
          </div>
          <div
            className="box-root flex-flex"
            style={{ gridArea: "8 / 4 / auto / 6" }}
          >
            <div
              className="box-root box-background--gray100 animationLeftRight tans3s"
              style={{ flexGrow: 1 }}
            ></div>
          </div>
          <div
            className="box-root flex-flex"
            style={{ gridArea: "2 / 15 / auto / end" }}
          >
            <div
              className="box-root box-background--cyan200 animationRightLeft tans4s"
              style={{ flexGrow: 1 }}
            ></div>
          </div>
          <div
            className="box-root flex-flex"
            style={{ gridArea: "3 / 14 / auto / end" }}
          >
            <div
              className="box-root box-background--blue animationRightLeft"
              style={{ flexGrow: 1 }}
            ></div>
          </div>
          <div
            className="box-root flex-flex"
            style={{ gridArea: "4 / 17 / auto / 20" }}
          >
            <div
              className="box-root box-background--gray100 animationRightLeft tans4s"
              style={{ flexGrow: 1 }}
            ></div>
          </div>
          <div
            className="box-root flex-flex"
            style={{ gridArea: "5 / 14 / auto / 17" }}
          >
            <div
              className="box-root box-divider--light-all-2 animationRightLeft tans3s"
              style={{ flexGrow: 1 }}
            ></div>
          </div>
        </div>
      </div>

      <div
        className="box-root padding-top--24 flex-flex flex-direction--column"
        style={{ flexGrow: 1, zIndex: 9 }}
      >
       <div className="box-root padding-top--48 padding-bottom--24 flex-flex flex-justifyContent--center">
  <h1>
    <a href="" rel="dofollow" className="header1">
      PharmaExpress
    </a>
  </h1>
</div>

<div className="formbg-outer">
  <div className="formbg">
    <div className="formbg-inner padding-horizontal--48">
      <span className="padding-bottom--15">
        Connectez-vous à votre compte.
      </span>
      <form id="stripe-login">
        <div className="field padding-bottom--24">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" onChange={onChange} value={loginForm.email} />
          {!isvalideField.email ? (
            <span className="incorrect-style-left">Email non valide.</span>
          ) : null}
        </div>
        <div className="field padding-bottom--24">
          <div className="grid--50-50">
            <label htmlFor="password">Mot de passe</label>
            <div className="reset-pass">
              <Link to={"/passwordForgotten"}>Mot de passe oublié ?</Link>
            </div>
          </div>
          <input
            type="password"
            name="password"
            onChange={onChange}
            value={loginForm.password}
          />
          {!isvalideField.password ? (
            <span className="incorrect-style-left">Mot de Passe trop Court</span>
          ) : null}
        </div>
        <div className="field field-checkbox padding-bottom--24 flex-flex align-center">
          <label htmlFor="checkbox">
            <input type="checkbox" name="checkbox" /> Restez connecté pendant une semaine
          </label>
        </div>
        <div className="field padding-bottom--24">
          <input
            type="submit"
            name="submit"
            value="Continue"
            onClick={(e) => {
              e.preventDefault();
              handleLoginPost();
            }}
          />
        </div>
        <div className="field"></div>
      </form>
      {incorrectAuth && (
        <span className="incorrect-style">Email ou Mot de Passe incorrect</span>
      )}
                <Link to={'/signup'} className='py-3 text-primary text-sm absolute left-[50%] translate-x-[-50%]  underline'>Crée un Compte</Link>
              </div>
           
  </div>

  <div className="footer-link padding-top--24">
  
    <div className="listing padding-top--24 padding-bottom--24 flex-flex center-center">
      <span>
        <a href="#">© PharmaExpress</a>
      </span>
      <span>
        <a href="#">Contact</a>
      </span>
      <span>
        <a href="#">Privacy & terms</a>
      </span>
    </div>
  </div>
</div>

      </div>
    </div>
  </div>
  );
};

export default Login;