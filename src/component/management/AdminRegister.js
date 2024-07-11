import Input from "../../component/Input";
import Button from "../../component/Button";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import UserCard from "./UserCard";

const AdminRegister = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [usersData, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);
  const fetchUsers = async () => {
    try {
      const response = await fetch(
        "https://e-commerce-nu-seven.vercel.app/api/admin/users"
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.loh(error);
    }
  };
  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });

  const handelSubmit = async (e) => {
    e.preventDefault(e);
    try {
      const res = await fetch(
        `https://e-commerce-nu-seven.vercel.app/api/admin/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...data }),
        }
      );
      await res.json();
      fetchUsers();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex h-screen flex-col items-start">
      <div className="p-2 bg-yellow-300 flex flex-row w-full items-center justify-between">
        <h1>Admins</h1>
        {isRegister ? <button
          onClick={() => setIsRegister(false)}
          className="px-6 py-1 flex flex-row items-center gap-2 bg-blue-500 text-white"
        >
          Close
        </button> : 
        <button
          onClick={() => setIsRegister((prev) => !prev)}
          className="px-6 py-1 flex flex-row items-center gap-2 bg-blue-500 text-white"
        >
          <FaPlus /> New
        </button>}
      </div>
      {isRegister && (
        <div className=" p-4 w-full">
          <form onSubmit={(e) => handelSubmit(e)}>
            <div className="flex flex-row gap-4">
              <Input
                type="text"
                label="First Name"
                placeholder="firstname.."
                value={data.firstname}
                onChange={(e) =>
                  setData({ ...data, firstname: e.target.value })
                }
              />
              <Input
                type="text"
                label="Last Name"
                placeholder="lastname.."
                value={data.lastname}
                onChange={(e) => setData({ ...data, lastname: e.target.value })}
              />
              <Input
                type="email"
                label="Email"
                placeholder="email.."
                value={data.email}
                onChange={(e) => setData({ ...data, email: e.target.value })}
              />
              <Input
                type="password"
                label="Password"
                placeholder="password.."
                value={data.password}
                onChange={(e) => setData({ ...data, password: e.target.value })}
              />
            </div>
            <div className="flex flex-row gap-4">
              <Input
                type="text"
                label="First Name"
                placeholder="firstname.."
                value={data.firstname}
                onChange={(e) =>
                  setData({ ...data, firstname: e.target.value })
                }
              />
              <Input
                type="text"
                label="Last Name"
                placeholder="lastname.."
                value={data.lastname}
                onChange={(e) => setData({ ...data, lastname: e.target.value })}
              />
              <Input
                type="email"
                label="Email"
                placeholder="email.."
                value={data.email}
                onChange={(e) => setData({ ...data, email: e.target.value })}
              />
              <Input
                type="password"
                label="Password"
                placeholder="password.."
                value={data.password}
                onChange={(e) => setData({ ...data, password: e.target.value })}
              />
            </div>
            <div className="flex flex-row gap-4">
              <Input
                type="text"
                label="First Name"
                placeholder="firstname.."
                value={data.firstname}
                onChange={(e) =>
                  setData({ ...data, firstname: e.target.value })
                }
              />
              <Input
                type="text"
                label="Last Name"
                placeholder="lastname.."
                value={data.lastname}
                onChange={(e) => setData({ ...data, lastname: e.target.value })}
              />
              <Input
                type="email"
                label="Email"
                placeholder="email.."
                value={data.email}
                onChange={(e) => setData({ ...data, email: e.target.value })}
              />
              <Input
                type="password"
                label="Password"
                placeholder="password.."
                value={data.password}
                onChange={(e) => setData({ ...data, password: e.target.value })}
              />
            </div>
            <Button type="submit" label={"Register"} />
          </form>
        </div>
      )}
      {!isRegister && <div className="w-full overflow-hidden">
        {usersData.map((user, index) => (
          <UserCard 
          key={index}
          id={user._id}
          regNo={user.regNo}
          mobile={user.mobile}
          firstname={user.firstname}
          lastname={user.lastname}
          username={user.username}
          email={user.email}
          />
        ))}
      </div>}
    </div>
  );
};

export default AdminRegister;
