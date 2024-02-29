import { SubmitHandler, useForm } from 'react-hook-form';
import { Delivery } from '../types/deliveryTypes';
import { deliveryService } from '../services/deliveryService';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { urls } from '../constants/urls';
import { departmentService } from '../services/departmentService';
import button from './styles/DeliveryPage.module.css';
import defaultImageURL from '../assets/image.webp';
import css from './styles/CreateDelivery.module.css';
import { phoneRegex } from './RegiterPage';
import { AxiosError } from 'axios';
import { DepartmentNumber } from '../types/departmentTypes';
import { unknown } from 'zod';

type RespErr = {
  detail: string;
};

const CreateDeliveryPage = () => {
  const navigate = useNavigate();
  const [showSuccessCreation, setShowSuccessCreation] = useState(false);
  const [imageSrc, setImageSrc] = useState<string>(defaultImageURL);
  const [imageFile, setImageFile] = useState<File>();
  const [departments, setDepartments] = useState<DepartmentNumber[]>();

  //response errors
  const [creationErr, setCreationErr] = useState<RespErr | unknown>();
  const [imageErr, setImageErr] = useState<RespErr | unknown>();

  //refs
  const fileInputRef = useRef<HTMLInputElement>(null);
  const sizeValue = useRef<string>();

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<Delivery>();

  const fetchDepartments = async () => {
    const departments = await departmentService.active();
    setDepartments(departments);
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setCreationErr(unknown);
    }, 3000);
    return () => clearTimeout(timeoutId);
  }, [creationErr]);

  useEffect(() => {
    fetchDepartments();
  }, []);

  useEffect(() => {
    clearErrors('item.image');
  }, [imageFile]);

  const saveDelivery: SubmitHandler<Delivery> = async (delivery) => {
    if (!sizeValue.current) {
      setError('item.size', { message: 'Choose prefered size: ' });
      return;
    }

    if (!imageFile) {
      setError('item.image', { message: 'Select image file' });
      return;
    }

    const formData = new FormData();
    formData.append('image', imageFile);

    try {
      const { data: createdDelivery, status } = await deliveryService.create(
        delivery
      );

      if (status === 201) {
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
    register('item.size', { value: e.target.value });
    sizeValue.current = e.target.value;
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
      {creationErr !== null &&
        typeof creationErr === 'object' &&
        'detail' in creationErr && (
          <span>{(creationErr as RespErr).detail}</span>
        )}
      {errors.receiver && <span>{errors.receiver.message}</span>}
      <label>
        Phone:
        <input
          type="text"
          placeholder="receiver"
          {...register('receiver', {
            required: 'Provide phone for receiver',
            pattern: {
              value: phoneRegex,
              message: 'Phone format: 0632503425',
            },
          })}
        />
      </label>
      {errors?.item?.label && <span>{errors.item.label.message}</span>}
      <label>
        Label:
        <input
          type="text"
          {...register('item.label', {
            required: 'Label is required',
            pattern: {
              value: /^(?=\s*\S)[\w\s]{1,30}$/,
              message: 'Special characters not allowed, max length 30',
            },
          })}
        />
      </label>
      {errors?.item?.price && <span>{errors.item.price.message}</span>}
      <label>
        Price:
        <input
          type="number"
          step=".01"
          {...register('item.price', {
            required: 'Minimal 1, maximum 999999',
            min: { value: 1, message: 'Minimal price is 1' },
            max: { value: 999999, message: 'Maximum price is 999999' },
            valueAsNumber: true,
          })}
        />
      </label>

      {errors.item?.size && <span>Choose prefed size: </span>}
      <div className={css.radioButtons}>
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
          marginBottom: 15,
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

      {errors.root && <h4>{errors.root.message}</h4>}
      <button className={button.button} type="submit">
        Send
      </button>
    </form>
  );
};

export { CreateDeliveryPage };
