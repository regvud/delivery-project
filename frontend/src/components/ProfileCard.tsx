import React, { useEffect, useState } from 'react';
import { Profile } from '../types/userTypes';
import css from './styles/ProfileCard.module.css';
import { usePage } from '../store/store';
import defaultAvatar from '../assets/defaultAvatar.jpg';
import { authService } from '../services/authService';

interface ProfileProps {
  profile: Profile;
}

const ProfileCard = ({ profile }: ProfileProps) => {
  const lastLogin: string = new Date(profile.last_login).toLocaleDateString(
    'es-CL'
  );
  const setRefresh = usePage((state) => state.setRefresh);
  const avatar = profile?.avatar[0]?.avatar;
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageSrc, setImageSrc] = useState<string>(avatar || defaultAvatar);
  const [imageMsg, setImageMsg] = useState<string>('');

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
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

  const fileInputRef = React.useRef<HTMLInputElement>(null);

  return (
    <>
      <div className="d-flex align-items-center justify-content-center">
        <input
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          ref={fileInputRef}
          onChange={handleFileChange}
        />
        <div className="d-flex align-items-center">
          <img
            className={css.profileImage}
            src={imageSrc}
            onClick={handleImageClick}
          />
          {imageMsg && <span style={{ paddingLeft: '10px' }}>{imageMsg}</span>}
        </div>
      </div>

      <h3>Email: {profile.email}</h3>
      <h3>Phone: {profile.phone}</h3>
      <h3>Last login: {lastLogin}</h3>
    </>
  );
};

export { ProfileCard };
