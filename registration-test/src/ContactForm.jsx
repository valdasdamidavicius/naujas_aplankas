import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

const ContactForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [submittedData, setSubmittedData] = useState(null);

    const onSubmit = (data) => {
        setSubmittedData(data);
    };

    return (
        <div>
            <h2>Contact Us</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label>Name</label>
                    <input {...register('name', { required: true, maxLength: 50 })} />
                    {errors.name && <p>Name is required and should be less than 50 characters.</p>}
                </div>

                <div>
                    <label>Email</label>
                    <input {...register('email', { required: true, pattern: /^\S+@\S+$/i })} />
                    {errors.email && <p>Please enter a valid email address.</p>}
                </div>

                <div>
                    <label>Message</label>
                    <textarea {...register('message', { required: true, maxLength: 500 })}></textarea>
                    {errors.message && <p>Message is required and should be less than 500 characters.</p>}
                </div>

                <button type="submit">Submit</button>
            </form>

            {submittedData && (
                <div>
                    <h3>Submitted Information</h3>
                    <p><strong>Name:</strong> {submittedData.name}</p>
                    <p><strong>Email:</strong> {submittedData.email}</p>
                    <p><strong>Message:</strong> {submittedData.message}</p>
                </div>
            )}
        </div>
    );
};

export default ContactForm;
