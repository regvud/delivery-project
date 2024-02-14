import { SubmitHandler, useForm } from 'react-hook-form';
import { Delivery } from '../types/deliveryTypes';
import { deliveryService } from '../services/deliveryService';
import { useEffect, useRef, useState } from 'react';
import { ResponseError } from '../types/axiosTypes';
import { useNavigate } from 'react-router-dom';
import { urls } from '../constants/urls';
import { useFetch } from '../hooks/useFetch';
import { departmentService } from '../services/departmentService';
import button from './styles/DeliveryPage.module.css';
import defaultImageURL from '../assets/image.webp';
import css from './styles/CreateDelivery.module.css';

const CreateDeliveryPage = () => {
  const navigate = useNavigate();
  const [showSuccessCreation, setShowSuccessCreation] = useState(false);
  const [responseError, setRepsonseError] = useState<ResponseError>();
  const [radioButtonInput, setRadioButtonInput] = useState<string>();
  const [imageSrc, setImageSrc] = useState<string>(defaultImageURL);
  const [imageFile, setImageFile] = useState<File>();

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

    const { data: createdDelivery, request: deliveryRequest } =
      await deliveryService.create(delivery);

    if (!deliveryRequest || deliveryRequest.status !== 201) {
      setError('root', { message: 'Error creating delivery' });
    } else {
      setShowSuccessCreation(true);

      await deliveryService.addImage(createdDelivery.id, formData);

      navigate(urls.profile.delivery(createdDelivery.id));
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
        <h1>Successfully created!</h1>
      ) : (
        <h1>Create Delivery</h1>
      )}
      {responseError?.detail?.includes('Department') && (
        <h5 style={{ margin: 0, color: 'red' }}>{responseError.detail}</h5>
      )}

      <label
        style={{ fontWeight: 'bold', marginBottom: '10px', display: 'block' }}
      >
        {errors.department && (
          <span style={{ color: 'red' }}>{errors.department.message}</span>
        )}
        <select
          style={{ width: '100%' }}
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
      </label>

      {responseError?.detail?.includes('phone') && (
        <h5 style={{ margin: 0, color: 'red' }}>{responseError.detail}</h5>
      )}

      <input
        type="text"
        placeholder="receiver"
        {...register('receiver', {
          required: true,
        })}
      />

      <input
        type="text"
        placeholder="label"
        {...register('item.label', { required: true })}
      />
      <input
        type="number"
        step=".01"
        placeholder="price"
        {...register('item.price', {
          required: true,
          min: 1,
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
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          margin: 5,
        }}
      >
        {!radioButtonInput && (
          <span style={{ color: 'crimson' }}>Select prefered size:</span>
        )}
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
