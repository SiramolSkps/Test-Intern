import { Icon } from "@iconify/react";
import { Button, Grid, Link, TextField, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import Swal from "sweetalert2";

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
  p: 0.5,
  fontSize: "16px",
  width: "120px",
  textAlign: "right",
  m: 1,
  borderRadius: "5px",
};

const EditUserComponent = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  const { slug } = useParams();

  const [state, setState] = useState({
    hnID: "",
    firstname: "",
    lastname: "",
    email: "",
    telephone: ""
  });
  const { hnID, firstname, lastname, email, telephone} = state;

  const handleSave = (e) => {
    e.preventDefault();
    console.log("Before save - state:", state);
    console.log("Before save - userData:", userData);
    axios
      .put(`${process.env.REACT_APP_API}/user/${userData.slug}`, {
        hnID,
        firstname,
        lastname,
        email,
        telephone,
        slug
      })
      .then((response) => {
        console.log("After save - response:", response.data);
        Swal.fire({
          title: "Success!",
          text: "บันทึกข้อมูลสำเร็จ",
          icon: "success",
        });
      })
      .catch((err) => {
        console.log("Save error:", err);
        Swal.fire({
          title: "Warning!",
          text: err.response.data.error,
          icon: "error",
        });
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    console.log("handleChange - state:", state);
  };

  const fetchUserData = async () => {
    try {
      const slug = window.location.pathname.split("/").pop();
      const response = await axios.get(
        `${process.env.REACT_APP_API}/user/${slug}`
      );
      setUserData(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API}/user/${slug}`)
      .then(response => {
        const { hnID, firstname, lastname, email, telephone } = response.data;
        setState(prevState => ({
          ...prevState,
          hnID,
          firstname,
          lastname,
          email,
          telephone,
          slug
        }));
        setUserData(response.data);
        console.log(response.data)
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        fetchUserData();
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return <p>Loading user data...</p>;
  }

  if (!userData) {
    return <p>No user data found for this slug.</p>;
  }

  const handleDelete = (slug) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteUser(slug);
      }
    });
  };

  const deleteUser = async (slug) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API}/user/${slug}`);
      Swal.fire({
        title: "Deleted!",
        text: `Account HN:${userData.slug} has been deleted.`,
        icon: "success",
      });
      history.push("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Container
        maxWidth="lg"
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            p: 4,
            background: "#fff",
            borderRadius: "15px",
            boxShadow: "3px 2px 15px -2px #ddd",
          }}
        >
          <Typography variant="h5" gutterBottom fontWeight="bold">
            เจ้าของ
          </Typography>
          <form onSubmit={handleSave}>
            <Grid
              container
              spacing={2}
              sx={{
                mt: 2,
                borderTop: "5px solid var(--success-main)",
                borderBottom: "5px solid var(--success-main)",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Grid
                item
                xs={12}
                sm={6}
                lg={4}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography sx={customTypographyStyle}>HN</Typography>
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  sx={customTextFieldStyle}
                  fullWidth
                  value={hnID}
                  disabled
                />
              </Grid>
              <Grid
                item
                xs={12}
                sm={6}
                lg={4}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography sx={customTypographyStyle}>ชื่อ</Typography>
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  sx={customTextFieldStyle}
                  fullWidth
                  required
                  value={firstname}
                  name="firstname"
                  onChange={handleChange}
                />
              </Grid>
              <Grid
                item
                xs={12}
                sm={6}
                lg={4}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography sx={customTypographyStyle}>นามสกุล</Typography>
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  sx={customTextFieldStyle}
                  fullWidth
                  required
                  value={lastname}
                  name="lastname"
                  onChange={handleChange}
                />
              </Grid>
              <Grid
                item
                xs={12}
                sm={6}
                lg={4}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography sx={customTypographyStyle}>เบอร์ติดต่อ</Typography>
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  sx={customTextFieldStyle}
                  fullWidth
                  required
                  value={telephone}
                  name="telephone"
                  onChange={handleChange}
                />
              </Grid>
              <Grid
                item
                xs={12}
                sm={6}
                lg={4}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography sx={customTypographyStyle}>Email</Typography>
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  sx={customTextFieldStyle}
                  fullWidth
                  required
                  value={email}
                  name="email"
                  onChange={handleChange}
                />
              </Grid>
              <Grid
                item
                xs={12}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  alignContent: "center",
                  margin: "5px 0 5px 0",
                }}
              >
                <Grid
                  item
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    alignContent: "center",
                    marginBottom: "10px",
                  }}
                >
                  <Link href="/" sx={{ textDecoration: "none" }}>
                    <Button
                      variant="contained"
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
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
                        sx={{ marginLeft: "4px", fontSize: "14px", mt: "2px" }}
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
                      alignItems: "center",
                      justifyContent: "center",
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
                      Save
                    </Typography>
                  </Button>
                  <Button
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
                    onClick={() => handleDelete(userData.slug)}
                  >
                    <Icon
                      icon="icon-park-solid:delete-five"
                      width="15px"
                      height="15px"
                    />
                    <Typography
                      sx={{ marginLeft: "4px", fontSize: "14px", mt: "2px" }}
                    >
                      Delete
                    </Typography>
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Container>
    </React.Fragment>
  );
};

export default EditUserComponent;
