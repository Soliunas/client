import { createContext, useEffect, useState } from "react";

export const initialContext = {
  loginStatus: false,
  updateLoginStatus: () => {},
  role: "public",
  updateRole: () => {},
  fullname: "",
  updateFullname: () => {},
  email: "",
  updateEmail: () => {},
  exampleTypes: [],
  addExampleType: () => {},
  deleteExampleType: () => {},
  editExampleType: () => {},
  updateExampleTypes: () => {},
}

export const GlobalContext = createContext(initialContext);

export const ContextWrapper = (props) => {
  const [loginStatus, setLoginStatus] = useState(initialContext.loginStatus);
  const [role, setRole] = useState(initialContext.role);
  const [fullname, setFullname] = useState(initialContext.fullname);
  const [email, setEmail] = useState(initialContext.email);
  const [exampleTypes, setExampleTypes] = useState(
    initialContext.exampleTypes
  )

  useEffect(() => {
    fetch("http://localhost:3001/api/login", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "ok" && data.user) {
          setLoginStatus(true);
          setRole(data.user.role);
          setFullname(data.user.fullname);
          setEmail(data.user.email);
        }
      })
      .catch(console.error)
  }, [])

  // Pradinis darbu tipu masyvas
  useEffect(() => {
    fetch("http://localhost:3001/api/example-types", {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "ok" && data.list) {
          setExampleTypes(data.list.map((t) => t.title))
        }
      })
      .catch(console.error)
  }, [])

  function updateLoginStatus(status) {
    setLoginStatus(status)
  }

  function updateRole(role) {
    const allowedRoles = ["public", "admin", "user"]
    if (allowedRoles.includes(role)) {
      setRole(role);
    }
  }

  function updateFullname(fullname) {
    setFullname(fullname);
  }

  function updateEmail(email) {
    setEmail(email)
  }

  function updateExampleTypes(exampleTypes) {
    setExampleTypes(exampleTypes)
  }

  function addExampleType(exampleType) {
    setExampleTypes((pre) => [...pre, exampleType])
  }

  function deleteExampleType(exampleType) {
    setExampleTypes((pre) => pre.filter((title) => title !== exampleType))
  }

  function editExampleType(oldExampleType, newExampleType) {
    setExampleTypes((pre) =>
      pre.map((title) =>
        title === oldExampleType ? newExampleType : title
      )
    )
  }

  const value = {
    loginStatus,
    updateLoginStatus,
    role,
    updateRole,
    fullname,
    updateFullname,
    email,
    updateEmail,
    exampleTypes,
    addExampleType,
    deleteExampleType,
    editExampleType,
    updateExampleTypes,
  }

  return (
    <GlobalContext.Provider value={value}>
      {props.children}
    </GlobalContext.Provider>
  );
}