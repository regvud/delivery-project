import React, { useEffect, useState } from 'react';
import { Profile } from '../types/userTypes';
import css from './styles/ProfileCard.module.css';
import { usePage } from '../store/store';
import defaultAvatar from '../assets/defaultAvatar.jpg';
import { authService } from '../services/authService';
import editImg from '../assets/newEdit.png';
import { phoneRegex } from '../pages/RegiterPage';
import button from '../pages/styles/DeliveryPage.module.css';
import { useLocalStorage } from '../hooks/useLocalStorage';

interface ProfileProps {
  profile: Profile;
}
const emailRegex = new RegExp(
  /[a-z0-9!#$%&'*+=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:[A-Z]{2}|com|org|net|gov|mil|biz|info|mobi|name|aero|jobs|museum)\b/
);

const ProfileCard = ({ profile }: ProfileProps) => {
  const lastLogin: string = new Date(profile.last_login).toLocaleDateString(
    'es-CL'
  );

  const { setItem } = useLocalStorage();
  const setRefresh = usePage((state) => state.setRefresh);
  const avatar = profile?.avatar[0]?.avatar;

  //image
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageSrc, setImageSrc] = useState<string>(avatar || defaultAvatar);
  const [imageMsg, setImageMsg] = useState<string>('');

  //bools
  const [showEmailInput, setShowEmailInput] = useState<boolean>(false);
  const [showPhoneInput, setShowPhoneInput] = useState<boolean>(false);
  const [isPhoneValid, setIsPhoneValid] = useState<boolean>();
  const [isEmailValid, setIsEmailValid] = useState<boolean>();

  //variables
  const [email, setEmail] = useState(profile.email);
  const [phone, setPhone] = useState(profile.phone);

  //inputs
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const emailInputRef = React.useRef<HTMLInputElement>(null);
  const phoneInputRef = React.useRef<HTMLInputElement>(null);

  const [loader, setLoader] = useState(false);

  const handlePhoneSave = async () => {
    const phone = phoneInputRef?.current?.value;
    if (phone) {
      const isValid = phoneRegex.test(phone);
      if (isValid) {
        const { data: user } = await authService.profile.changePhone(phone);
        setIsPhoneValid(isValid);
        setShowPhoneInput(false);
        setPhone(user.phone);
        return;
      }
      setIsPhoneValid(isValid);
    }
  };

  const handleEmailSave = async () => {
    const email = emailInputRef?.current?.value;
    if (email) {
      const isValid = emailRegex.test(email);
      if (isValid) {
        setLoader(true);
        setItem('newEmail', email);

        const { status } = await authService.changeEmailRequest(email);

        status && setLoader(false);
        if (status === 200) {
          setIsEmailValid(isValid);
        }
        return;
      }
      setIsEmailValid(isValid);
    }
  };

  const handleImageClick = (ref: React.RefObject<HTMLInputElement>) => {
    if (ref.current) {
      ref.current.click();
    }
  };

  const handleSave = async () => {
    if (imageFile) {
      const formData = new FormData();
      formData.append('avatar', imageFile);
      try {
        const { request } = await authService.profile.addAavatar(formData);
        if (request.status == 200) {
          setImageMsg('Image saved successfully ✅');
          setRefresh();
        } else {
          setImageMsg('Failed to save image 🧐');
        }
      } catch (error) {
        console.error('Error while saving image:', error);
      }
    }
  };

  useEffect(() => {
    if (imageFile) {
      handleSave();
    }
  }, [imageFile]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader.result as string);
        setImageFile(file);
        handleSave();
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <div>
        <input
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          ref={fileInputRef}
          onChange={handleFileChange}
        />
        <div>
          <img
            className={css.profileImage}
            src={imageSrc}
            onClick={() => handleImageClick(fileInputRef)}
          />
          {imageMsg && <span style={{ paddingLeft: '10px' }}>{imageMsg}</span>}
        </div>
      </div>

      <div className={css.divs}>
        <h3>Email: {email}</h3>
        <img
          className={css.images}
          onClick={() => setShowEmailInput((prev) => !prev)}
          src={editImg}
          alt="edit"
        />
        {showEmailInput && (
          <div>
            {isEmailValid === false && (
              <span style={{ marginRight: 10 }}>Invalid email</span>
            )}
            <input
              className={css.inputs}
              type="text"
              ref={emailInputRef}
              placeholder="enter your new email here"
            />
            {loader ? (
              <span style={{ marginLeft: 5 }}>please wait</span>
            ) : isEmailValid !== true ? (
              <button
                className={button.button}
                style={{ marginLeft: '15px', fontSize: '15px' }}
                onClick={handleEmailSave}
              >
                save
              </button>
            ) : (
              <span style={{ marginLeft: 5 }}>check email</span>
            )}
          </div>
        )}
      </div>
      <div className={css.divs}>
        <h3>Phone: {phone}</h3>
        <img
          className={css.images}
          onClick={() => setShowPhoneInput((prev) => !prev)}
          src={editImg}
          alt="edit"
        />
        {showPhoneInput && (
          <div>
            {isPhoneValid === false && <span>Invalid phone</span>}
            <input
              className={css.inputs}
              type="text"
              ref={phoneInputRef}
              placeholder="enter your new phone here"
            />
            <button
              className={button.button}
              style={{ marginLeft: '15px', fontSize: '15px' }}
              onClick={handlePhoneSave}
            >
              save
            </button>
          </div>
        )}
      </div>
      <h3>Last login: {lastLogin}</h3>
    </>
  );
};

export { ProfileCard };
