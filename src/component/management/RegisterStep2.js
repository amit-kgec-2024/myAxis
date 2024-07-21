import React from 'react';
import Input from "../Input";
import Button from "../Button";

const RegisterStep2 = ({ handelSubmit, data, setData, errors }) => {
  return (
    <div>
      <form onSubmit={handelSubmit}>
        <Input
          type="text"
          label="mobile"
          placeholder="mobile.."
          value={data.mobile}
          onChange={(e) => setData({ ...data, mobile: e.target.value })}
        />
        {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
        <Input
          type="email"
          label="Email"
          placeholder="email.."
          value={data.email}
          onChange={(e) => setData({ ...data, email: e.target.value })}
        />
        {errors.mobile && <p style={{ color: "red" }}>{errors.mobile}</p>}
        <Input
          type="text"
          label="Pan Number"
          placeholder="Enter Details..."
          className="w-[44%]"
          value={data.panNumber}
          onChange={(e) => setData({ ...data, panNumber: e.target.value })}
        />
        {errors.panNumber && <p style={{ color: "red" }}>{errors.panNumber}</p>}
        <Input
          type="text"
          label="Aadhar Number"
          placeholder="Enter Details..."
          className="w-[44%]"
          value={data.aadharNumber}
          onChange={(e) => setData({ ...data, aadharNumber: e.target.value })}
        />
        {errors.aadharNumber && <p style={{ color: 'red' }}>{errors.aadharNumber}</p>}
        <Button type="submit" label={"Register"} />
      </form>
    </div>
  );
};

export default RegisterStep2
