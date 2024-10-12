const handleInputChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement> , form: any, setForm: React.Dispatch<React.SetStateAction<any>>) => {
  const { name, value } = e.target;

  setForm({
    ...form,
    [name]: value
  });
};

export default handleInputChange