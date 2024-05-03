import React, { useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import {
  Typography,
  Grid,
  Box,
  TextField,
  Button,
  Link,
  FormHelperText,
  Container
} from "@mui/material";
import axios from "axios";
import Swal from "sweetalert2";
import { Icon } from "@iconify/react";

const customTextFieldStyle = {
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      m: 1.5,
    },
    "&:hover fieldset": {
      borderColor: "var(--success-light)",
    },
    "&.Mui-focused fieldset": {
      borderColor: "var(--success-light)",
    },
  },
};

const customTypographyStyle = {
  fontSize: "16px",
  width: "120px",
  textAlign: "right",
  mt: 2,
  borderRadius: "5px",
};

export default function CreateUserComponent() {
  const [state, setState] = useState({
    hnID: "",
    firstname: "",
    lastname: "",
    email: "",
    telephone: "",
  });
  const { hnID, firstname, lastname, email, telephone } = state;

  const [telephoneError, setTelephoneError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [hnIDError, setHnIDError] = useState(false);
  const [firstnameError, setFirstnameError] = useState(false);
  const [lastnameError, setLastnameError] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [showError, setShowError] = useState(false);
  const [isFormValid, setIsFormValid] = useState(true);

  // กำหนดค่าให้กับ state
  const inputValue = (name) => (event) => {
    const trimmedValue = event.target.value.trim();

    let error = false;

    switch (name) {
      case "telephone":
        error = !/^0\d{2}-\d{7}$/.test(trimmedValue);
        setTelephoneError(error);
        break;

      case "email":
        error = !/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/.test(trimmedValue);
        setEmailError(error);
        break;

      case "hnID":
        error = !/^\d{6}$/.test(trimmedValue);
        setHnIDError(error);
        break;

      case "firstname":
        error = trimmedValue === "";
        setFirstnameError(error);
        break;

      case "lastname":
        error = trimmedValue === "";
        setLastnameError(error);
        break;

      default:
        break;
    }

  const isAnyError = Object.values({
    hnIDError,
    firstnameError,
    lastnameError,
    emailError,
    telephoneError,
  }).some((error) => error);

  if (isAnyError) {
    setShowError(true); 
    setIsFormValid(false); 
  } else {
    setShowError(false); 
    setIsFormValid(true); 
  }
  
    setState({ ...state, [name]: trimmedValue });
  };

  const handleClear = () => {
    setState({
      hnID: "",
      firstname: "",
      lastname: "",
      email: "",
      telephone: "",
    });
  };

  const handleFocus = (name) => () => {
    setFocusedField(name);
  };

  const handleBlur = () => {
    setFocusedField(null);
    setShowError(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("API URL", process.env.REACT_APP_API);

    if (!hnID || !firstname || !lastname || !email || !telephone) {
      // ถ้ามีข้อมูลที่ขาดหายไป ให้แสดง error และยังไม่เรียกใช้ handleSubmit
      setHnIDError(!hnID);
      setFirstnameError(!firstname);
      setLastnameError(!lastname);
      setEmailError(!email);
      setTelephoneError(!telephone);
      setShowError(true);
      return;
    }

    if (!isFormValid) {
      // ถ้าข้อมูลไม่ถูกต้อง ให้แสดง alert และยังไม่เรียกใช้ handleSubmit
      alert("โปรดกรอกข้อมูลให้ถูกต้องก่อนทำการส่ง");
      return;
    }

    // ถ้าผ่านการตรวจสอบทั้งหมด ก็ส่งข้อมูลไปยัง API
    axios
      .post(`${process.env.REACT_APP_API}/create`, {
        hnID,
        firstname,
        lastname,
        email,
        telephone,
      })
      .then((response) => {
        Swal.fire({
          title: "Success!",
          text: "บันทึกข้อมูลสำเร็จ",
          icon: "success",
        });
        setState({
          hnID: "",
          firstname: "",
          lastname: "",
          email: "",
          telephone: "",
        });
        setShowError(false);
      })
      .catch((err) => {
        Swal.fire({
          title: "Warning!",
          text: err.response.data.error,
          icon: "error",
        });
        setShowError(true);
      });
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Container
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            background: "#fff",
            borderRadius: "15px",
            boxShadow: "3px 2px 15px -2px #ddd",
          }}
        >
          <Grid
            item
            sx={{
              p: 5,
              background: "#fff",
              borderRadius: "15px",
            }}
          >
            <Typography variant="h5" gutterBottom fontWeight="bold">
              เจ้าของ
            </Typography>
            <form onSubmit={handleSubmit}>
              <Grid
                container
                spacing={2}
                sx={{
                  mt: 2,
                  borderTop: "5px solid var(--success-main)",
                  borderBottom: "5px solid var(--success-main)",
                }}
              >
                <Grid
                  item
                  xs={12}
                  sm={6}
                  lg={4}
                  sx={{
                    display: "flex",
                    alignItems: "flex-start",
                  }}
                >
                  <Typography sx={{ ...customTypographyStyle }}>
                    HN<span style={{ color: "red" }}>*</span>
                  </Typography>
                  <Box
                    sx={{
                      height: "60px",
                      width: "400px",
                    }}
                  >
                    <Grid item sx={{ width: "100%" }}>
                      <TextField
                        id="outlined-basic"
                        variant="outlined"
                        autoComplete="off"
                        sx={customTextFieldStyle}
                        fullWidth
                        value={hnID}
                        onChange={inputValue("hnID")}
                        onFocus={handleFocus("hnID")}
                        onBlur={handleBlur}
                        error={
                          hnIDError && (focusedField === "hnID" || showError)
                        }
                      />
                      {hnIDError && (focusedField === "hnID" || showError) && (
                        <FormHelperText error sx={{ marginLeft: 2 }}>
                          โปรดระบุข้อมูล HN เป็นตัวเลขจำนวน 6 ตัว
                        </FormHelperText>
                      )}
                    </Grid>
                  </Box>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  lg={4}
                  sx={{
                    display: "flex",
                    alignItems: "flex-start",
                  }}
                >
                  <Typography sx={{ ...customTypographyStyle }}>
                    ชื่อ<span style={{ color: "red" }}>*</span>
                  </Typography>
                  <Box
                    sx={{
                      height: "60px",
                      width: "400px",
                    }}
                  >
                    <Grid item sx={{ width: "100%" }}>
                      <TextField
                        id="outlined-basic"
                        variant="outlined"
                        autoComplete="off"
                        sx={customTextFieldStyle}
                        fullWidth
                        value={firstname}
                        onChange={inputValue("firstname")}
                        onFocus={handleFocus("firstname")}
                        onBlur={handleBlur}
                        error={
                          firstnameError &&
                          (focusedField === "firstname" || showError)
                        }
                      />
                      {firstnameError &&
                        (focusedField === "firstname" || showError) && (
                          <FormHelperText error sx={{ marginLeft: 2 }}>
                            โปรดระบุชื่อให้ถูกต้อง
                          </FormHelperText>
                        )}
                    </Grid>
                  </Box>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  lg={4}
                  sx={{
                    display: "flex",
                    alignItems: "flex-start",
                  }}
                >
                  <Typography sx={{ ...customTypographyStyle }}>
                    นามสกุล<span style={{ color: "red" }}>*</span>
                  </Typography>
                  <Box
                    sx={{
                      height: "60px",
                      width: "400px",
                    }}
                  >
                    <Grid item sx={{ width: "100%" }}>
                      <TextField
                        id="outlined-basic"
                        variant="outlined"
                        autoComplete="off"
                        sx={customTextFieldStyle}
                        fullWidth
                        value={lastname}
                        onChange={inputValue("lastname")}
                        onFocus={handleFocus("lastname")}
                        onBlur={handleBlur}
                        error={
                          lastnameError &&
                          (focusedField === "lastname" || showError)
                        }
                      />
                      {lastnameError &&
                        (focusedField === "lastname" || showError) && (
                          <FormHelperText error sx={{ marginLeft: 2 }}>
                            โปรดระบุนามสกุลให้ถูกต้อง
                          </FormHelperText>
                        )}
                    </Grid>
                  </Box>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  lg={4}
                  sx={{
                    display: "flex",
                    alignItems: "flex-start",
                  }}
                >
                  <Typography sx={{ ...customTypographyStyle }}>
                    เบอร์ติดต่อ<span style={{ color: "red" }}>*</span>
                  </Typography>
                  <Box
                    sx={{
                      height: "60px",
                      width: "400px",
                    }}
                  >
                    <Grid item sx={{ width: "100%" }}>
                      <TextField
                        id="outlined-basic"
                        variant="outlined"
                        autoComplete="off"
                        sx={customTextFieldStyle}
                        fullWidth
                        value={telephone}
                        onChange={inputValue("telephone")}
                        onFocus={handleFocus("telephone")}
                        onBlur={handleBlur}
                        error={
                          telephoneError &&
                          (focusedField === "telephone" || showError)
                        }
                      />
                      {telephoneError &&
                        (focusedField === "telephone" || showError) && (
                          <FormHelperText error sx={{ marginLeft: 2 }}>
                            โปรดระบุเบอร์ติดต่อให้ถูกต้อง (รูปแบบ: 0XX-XXXXXXX)
                          </FormHelperText>
                        )}
                    </Grid>
                  </Box>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  lg={4}
                  sx={{
                    display: "flex",
                    alignItems: "flex-start",
                  }}
                >
                  <Typography
                    sx={{
                      ...customTypographyStyle,
                      marginBottom: "24px",
                      paddingRight: "8px",
                    }}
                  >
                    Email<span style={{ color: "red" }}>*</span>
                  </Typography>
                  <Box
                    sx={{
                      height: "60px",
                      width: "400px",
                    }}
                  >
                    <Grid item sx={{ width: "100%" }}>
                      <TextField
                        id="outlined-basic"
                        variant="outlined"
                        autoComplete="off"
                        sx={customTextFieldStyle}
                        fullWidth
                        value={email}
                        onChange={inputValue("email")}
                        onFocus={handleFocus("email")}
                        onBlur={handleBlur}
                        error={
                          emailError && (focusedField === "email" || showError)
                        }
                      />
                      {emailError &&
                        (focusedField === "email" || showError) && (
                          <FormHelperText error sx={{ marginLeft: 2 }}>
                            โปรดระบุอีเมลให้ถูกต้อง (ในรูปแบบ: example@mail.com)
                          </FormHelperText>
                        )}
                    </Grid>
                  </Box>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    alignContent: "center",
                    margin: "0px 0 5px 0",
                  }}
                >
                  <Grid
                    item
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      alignContent: "center",
                      margin: "20px 0 10px 0",
                    }}
                  >
                    <Link href="/" sx={{ textDecoration: "none" }}>
                      <Button
                        variant="contained"
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          m: 1,
                          background: "#eee",
                          color: "black",
                          width: "110px",
                          "&:hover": {
                            backgroundColor: "var(--zinc-light)",
                          },
                          "&:active": {
                            backgroundColor: "var(--zinc-light)",
                          },
                        }}
                      >
                        <Icon
                          icon="mdi:arrow-back-circle"
                          width="15px"
                          height="15px"
                        />
                        <Typography
                          sx={{ marginLeft: "4px", fontSize: "14px" }}
                        >
                          Cancel
                        </Typography>
                      </Button>
                    </Link>
                    <Button
                      type="submit"
                      variant="contained"
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        m: 1,
                        background: "var(--success-main)",
                        width: "110px",
                        "&:hover": {
                          backgroundColor: "var(--success-light)",
                        },
                        "&:active": {
                          backgroundColor: "var(--success-main)",
                        },
                      }}
                    >
                      <Icon icon="bxs:save" width="15px" height="15px" />
                      <Typography
                        sx={{ marginLeft: "4px", fontSize: "14px", mt: "2px" }}
                      >
                        Add
                      </Typography>
                    </Button>
                    <Button
                      onClick={handleClear}
                      variant="contained"
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        m: 1,
                        background: "var(--warning-light)",
                        width: "110px",
                        "&:hover": {
                          backgroundColor: "var(--warning-dark)",
                        },
                        "&:active": {
                          backgroundColor: "var(--warning-light)",
                        },
                      }}
                    >
                      <Icon
                        icon="ic:twotone-clear"
                        width="16px"
                        height="16px"
                      />
                      <Typography
                        sx={{ marginLeft: "4px", fontSize: "14px", mt: "2px" }}
                      >
                        Clear
                      </Typography>
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </form>
          </Grid>
        </Box>
      </Container>
    </React.Fragment>
  );
}
