import React from 'react'

const UserDetails = ({
  regNo,
  email,
  password,
  passwords,
  profImage,
  dob,
  gender,
  aadharImage,
  aadharNumber,
  briefDescription,
  community,
  fatherName,
  husbandName,
  mobile,
  panImage,
  panNumber,
  permamentAddress,
  pin,
  qulification,
  state_name,
  district_name,
  lastname,
  firstname,
}) => {
  return (
    <div>
      {state_name}, {district_name}
      <div className="">{regNo}</div>
      <div className="">{firstname}</div>
      <div className="">{lastname}</div>
      <div className="">{panNumber}</div>
      <div className="">{aadharNumber}</div>
      <div className="">{email}</div>
      <div className="">{mobile}</div>
      <div className="">{fatherName}</div>
      <div className="">{gender}</div>
      <div className="">{dob}</div>
      <div className="">{passwords}</div>
      <img src={profImage} alt="" />
      <img src={aadharImage} alt="" />
      <img src={panImage} alt="" />
    </div>
  );
};

export default UserDetails
