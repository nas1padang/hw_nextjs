import Navbar from '@/components/Navbar';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Swal from 'sweetalert2';

const BookCreate = () => {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publisher, setPublisher] = useState('');
  const [year, setYear] = useState('');
  const [pages, setPages] = useState('');
  const [file, setFile] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('author', author);
    formData.append('publisher', publisher);
    formData.append('year', year);
    formData.append('pages', pages);
    formData.append('image', file);

    try {
      await axios.post('/api/book', formData, {
        headers: {
          'Authorization': `Bearer ${Cookies.get('token')}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      Swal.fire('Successfully added book!', '', 'success');
      router.push('/');
    } catch (error) {
      console.error(error);
      Swal.fire('Error', error.response?.data?.message || 'An error occurred', 'error');
    }

    setTitle('');
    setAuthor('');
    setPublisher('');
    setYear(0);
    setPages(0);
    setFile(null);
  };

  return (
    <>
      <Navbar />
      <div className="mx-10 mt-10 mb-12">
        <form onSubmit={handleSubmit}>
          {/* Input fields */}
          <InputField label="Title" value={title} onChange={e => setTitle(e.target.value)} />
          <InputField label="Author" value={author} onChange={e => setAuthor(e.target.value)} />
          <InputField label="Publisher" value={publisher} onChange={e => setPublisher(e.target.value)} />
          <InputField label="Year" type="number" value={year} onChange={e => setYear(e.target.value)} />
          <InputField label="Pages" type="number" value={pages} onChange={e => setPages(e.target.value)} />
          <InputField label="Image" type="file" onChange={e => setFile(e.target.files[0])} />

          {/* Submit button */}
          <div className="flex justify-end">
            <button className="text-white bg-blue-700 hover:bg-blue-800 rounded-lg px-5 py-2.5">
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

const InputField = ({ label, type = 'text', value, onChange }) => (
  <div className="mb-6">
    <label htmlFor={label.toLowerCase()} className="block mb-2 text-sm font-medium text-gray-900">
      {label}
    </label>
    <input
      type={type}
      id={label.toLowerCase()}
      name={label.toLowerCase()}
      value={value}
      onChange={onChange}
      className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5"
      required
    />
  </div>
);

export default BookCreate;
