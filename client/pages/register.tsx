import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function RegisterPage() {
  const router = useRouter();
  interface FormValues {
    email: string;
    password: string;
    gender: string;
  }

  type ErrorMap = Record<string, string>;

  const [form, setForm] = useState<FormValues>({ email: '', password: '', gender: '' });
  const [errors, setErrors] = useState<ErrorMap>({});
  const [showPassword, setShowPassword] = useState(false);

  const validate = () => {
    const errs: ErrorMap = {};
    if (!form.email.match(/^[^@\s]+@[^@\s]+\.[^@\s]+$/)) errs.email = 'Invalid email';
    if (form.password.length < 8) errs.password = 'Password must be at least 8 characters';
    if (!['male','female','other'].includes(form.gender)) errs.gender = 'Select gender';
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length) { setErrors(validationErrors); return; }
    try {
      console.log('Register request:', form);
      // Register user
      await axios.post(`${API_BASE_URL}/registration`, form);

      // Login and get token
      let loginResponse;
      try {
        loginResponse = await axios.post(`${API_BASE_URL}/login`, form);
      } catch (loginErr: any) {
        if (loginErr.response && loginErr.response.status === 401) {
          setErrors(prev => ({ ...prev, api: 'Invalid credentials. Please check your email and password.' }));
        }
        throw loginErr;
      }

      const response = loginResponse;

      console.log("User Token: " + response.data.token);

      if (typeof window !== 'undefined') {
        localStorage.setItem('authToken', response.data.token);
      }

      axios.get(`${API_BASE_URL}/profile`, {
          headers: {
              'Authorization': `Bearer ${response.data.token}`,
              'Accept': 'application/json'
          }
      })
      .then(response => {
          console.log('Profile response:', response.data);
      })
      .catch(error => {
          console.error('Profile request error:', error.response.data);
      });

      router.push('/profile');
    } catch (err: any) {
      console.error(err.response?.data || err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{maxWidth:400, margin:'auto'}}>
      <h2>Регистрация</h2>
      <div>
        <label>Email:</label><br/>
        <input type="email" value={form.email} onChange={(e)=>setForm({...form,email:e.target.value})}/>
        {errors.email && <p style={{color:'red'}}>{errors.email}</p>}
      </div>
      <div>
        <label>Password:</label><br/>
        <input type={showPassword?'text':'password'} value={form.password} onChange={(e)=>setForm({...form,password:e.target.value})}/>
        <button type="button" onClick={()=>setShowPassword(!showPassword)}>{showPassword? 'Hide':'Show'}</button>
        {errors.password && <p style={{color:'red'}}>{errors.password}</p>}
      </div>
      <div>
        <label>Gender:</label><br/>
        <select value={form.gender} onChange={(e)=>setForm({...form,gender:e.target.value})}>
          <option value="">Select</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        {errors.gender && <p style={{color:'red'}}>{errors.gender}</p>}
      </div>
      <button type="submit">Register</button>
        {errors.api && <p style={{color:'red'}}>{errors.api}</p>}
    </form>
  );
}