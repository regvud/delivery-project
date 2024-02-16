import { SubmitHandler, useForm } from 'react-hook-form';
import { Delivery } from '../types/deliveryTypes';
import { deliveryService } from '../services/deliveryService';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { urls } from '../constants/urls';
import { useFetch } from '../hooks/useFetch';
import { departmentService } from '../services/departmentService';
import button from './styles/DeliveryPage.module.css';
import defaultImageURL from '../assets/image.webp';
import css from './styles/CreateDelivery.module.css';
import { phoneRegex } from './RegiterPage';
import { AxiosError } from 'axios';

type RespErr = {
  detail: string;
};
const CreateDeliveryPage = () => {
  const navigate = useNavigate();
  const [showSuccessCreation, setShowSuccessCreation] = useState(false);
  const [radioButtonInput, setRadioButtonInput] = useState<string>();
  const [imageSrc, setImageSrc] = useState<string>(defaultImageURL);
  const [imageFile, setImageFile] = useState<File>();

  //response errors
  const [creationErr, setCreationErr] = useState<RespErr | unknown>();
  const [imageErr, setImageErr] = useState<RespErr | unknown>();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<Delivery>();

  useEffect(() => {
    clearErrors('item.image');
  }, [imageFile]);

  const { data: departments } = useFetch(departmentService.active(), [
    'departmentNumbers',
  ]);

  const saveDelivery: SubmitHandler<Delivery> = async (delivery) => {
    if (!imageFile) {
      setError('item.image', { message: 'Select image file' });
      return;
    }

    const formData = new FormData();
    formData.append('image', imageFile);

    try {
      const { data: createdDelivery, request } = await deliveryService.create(
        delivery
      );

      if (request.status === 201) {
        setShowSuccessCreation(true);

        try {
          await deliveryService.addImage(createdDelivery.id, formData);
          navigate(urls.profile.delivery(createdDelivery.id));
        } catch (e) {
          const imageErr = e as AxiosError;
          setImageErr(imageErr?.response?.data);
        }
      }
    } catch (e) {
      const creationErr = e as AxiosError;
      setCreationErr(creationErr?.response?.data);
    }
  };

  const handleRadioButtons = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRadioButtonInput(e.target.value);
    register('item.size', { value: e.target.value });
  };

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader.result as string);
        setImageFile(file);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <form className={css.form} onSubmit={handleSubmit(saveDelivery)}>
      {showSuccessCreation ? (
        <h1 className={css.title}>Successfully created!</h1>
      ) : (
        <h1 className={css.title}>Create Delivery</h1>
      )}

      {errors.department && <span>{errors.department.message}</span>}
      <select
        id="department-select"
        placeholder="department"
        {...register('department', {
          required: 'Select valid department',
          valueAsNumber: true,
        })}
      >
        <option value="">select department</option>
        {departments?.map((department) => (
          <option
            value={department.general_number}
            key={department.general_number}
          >
            № {department.general_number} - {department.city}
          </option>
        ))}
      </select>

      {errors.receiver && <span>{errors.receiver.message}</span>}
      {creationErr !== null &&
        typeof creationErr === 'object' &&
        'detail' in creationErr && (
          <span>{(creationErr as RespErr).detail}</span>
        )}

      <input
        type="text"
        placeholder="receiver"
        {...register('receiver', {
          required: 'Provide phone for receiver',
          pattern: {
            value: phoneRegex,
            message: 'Phone format: 380632503425',
          },
        })}
      />

      {errors?.item?.label && <span>{errors.item.label.message}</span>}
      <input
        type="text"
        placeholder="label"
        {...register('item.label', {
          required: 'Label is required',
          pattern: {
            value: /^(?=\s*\S)[\w\s]{1,30}$/,
            message: 'Special characters not allowed, max length 30',
          },
        })}
      />

      {errors?.item?.price && <span>{errors.item.price.message}</span>}
      <input
        type="number"
        step=".01"
        placeholder="price"
        {...register('item.price', {
          required: 'Minimal 1, maximum 999999',
          min: { value: 1, message: 'Minimal price is 1' },
          max: { value: 999999, message: 'Maximum price is 999999' },
          valueAsNumber: true,
        })}
      />
      <input
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        ref={fileInputRef}
        onChange={handleFileChange}
      />
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <img
          style={{
            width: '85%',
            height: '300px',
            cursor: 'pointer',
            borderRadius: 5,
          }}
          src={imageSrc}
          onClick={handleImageClick}
        />
        {errors.item?.image && <span>{`<- ${errors.item.image.message}`}</span>}
        {imageErr !== null &&
          typeof imageErr === 'object' &&
          'detail' in imageErr && <span>{(imageErr as RespErr).detail}</span>}
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          margin: 5,
        }}
      >
        {!radioButtonInput && <span>Select prefered size:</span>}
        <label>
          <input
            type="radio"
            name="size"
            value={'small'}
            id="small"
            onChange={handleRadioButtons}
          />
          small
        </label>
        <label>
          <input
            type="radio"
            name="size"
            value={'medium'}
            id="medium"
            onChange={handleRadioButtons}
          />
          medium
        </label>
        <label>
          <input
            type="radio"
            name="size"
            value={'large'}
            id="large"
            onChange={handleRadioButtons}
          />
          large
        </label>
        <label>
          <input
            type="radio"
            name="size"
            value={'giant'}
            id="giant"
            onChange={handleRadioButtons}
          />
          giant
        </label>
      </div>

      {errors.root && <h4>{errors.root.message}</h4>}
      <button className={button.button} type="submit">
        Send
      </button>
    </form>
  );
};

export { CreateDeliveryPage };
