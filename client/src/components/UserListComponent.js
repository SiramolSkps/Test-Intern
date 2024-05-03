import React, { useState, useEffect } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import axios from "axios";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";

export default function UserListComponent() {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [inputSearch, setInputSearch] = useState("");

  const filteredItems = items.filter((item) => {
    const fullName = `${item.firstname} ${item.lastname}`.toLowerCase();
    const searchTerm = inputSearch.toLowerCase();
    return (
      fullName.includes(searchTerm) ||
      item.hnID.includes(searchTerm) ||
      item.telephone.includes(searchTerm) ||
      item.email.includes(searchTerm)
    );
  });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleChange = (value) => {
    setInputSearch(value);
    fetchData(value);
  };

  const fetchData = (searchTerm = "") => {
    axios
      .get(`${process.env.REACT_APP_API}/users`, {
        params: {
          searchTerm: searchTerm,
        },
      })
      .then((response) => {
        console.log("Response data:", response.data);
        setItems(response.data);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        alert(err);
      });
  };

  useEffect(() => {
    console.log("Fetching data...");
    fetchData(inputSearch);
  }, [inputSearch]);

  return (
    <React.Fragment>
      <CssBaseline />
      <Container
        maxWidth="lg"
        sx={{
          p: 2,
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            height: "600px",
            width: "1500px",
          }}
        >
          <Paper
            sx={{
              p: 2,
              borderRadius: "1em",
              boxShadow: "3px 2px 15px -2px #ddd",
            }}
          >
            <Box
              display="flex"
              sx={{
                borderBottom: "5px solid var(--success-main)",
                mb: 3,
                pb: 2,
              }}
            >
              <Box sx={{ flexGrow: 1 }}>
                <Typography
                  variant="h5"
                  gutterBottom
                  component="div"
                  fontWeight="bold"
                  sx={{ m: 3, display: "flex", alignItems: "center" }}
                >
                  ค้นหาเจ้าของ
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignSelf: "center",
                  justifyContent: "center",
                  m: 2.5,
                }}
              >
                <TextField
                  id="search-bar"
                  value={inputSearch}
                  className="text"
                  variant="outlined"
                  placeholder="Search..."
                  size="small"
                  autoComplete="off"
                  onChange={(e) => handleChange(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <SearchIcon
                        style={{ fill: "gray", marginRight: "8px" }}
                      />
                    ),
                  }}
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Link to={"/create"}>
                  <Button
                    variant="contained"
                    sx={{
                      background: "var(--success-dark)",
                      "&:hover": {
                        background: "var(--success-main)",
                      },
                    }}
                  >
                    <Icon
                      icon="material-symbols:create-new-folder-rounded"
                      width="1.2em"
                      height="1.2em"
                    />
                    <Typography
                      sx={{
                        mt: "2px",
                        fontSize: "14px",
                        marginLeft: 0.5,
                      }}
                    >
                      Create
                    </Typography>
                  </Button>
                </Link>
              </Box>
            </Box>
            <TableContainer
              component={Paper}
              sx={{
                maxHeight: 440,
                overflowY: "auto",
                height: "400px",
                width: "100%",
              }}
            >
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead sx={{ background: "var(--success-light)" }}>
                  <TableRow>
                    <TableCell align="center" sx={{ color: "#fff" }}>
                      Operations
                    </TableCell>
                    <TableCell align="left" sx={{ color: "#fff" }}>
                      HN เจ้าของ
                    </TableCell>
                    <TableCell align="left" sx={{ color: "#fff" }}>
                      ชื่อเจ้าของ
                    </TableCell>
                    <TableCell align="left" sx={{ color: "#fff" }}>
                      เบอร์ติดต่อ
                    </TableCell>
                    <TableCell align="left" sx={{ color: "#fff" }}>
                      อีเมล
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredItems
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, id) => (
                      <TableRow
                        key={id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell align="center" component="th" scope="row">
                          <Link to={`/user/${row.slug}`}>
                            <Button
                              sx={{
                                background: "#deeede",
                                "&:hover": {
                                  background: "#eee",
                                },
                              }}
                              onClick={() => console.log("Slug:", row.slug)}
                            >
                              <Icon
                                icon="lucide:edit"
                                width="1.2em"
                                height="1.2em"
                                color="var(--zinc-dark)"
                              />
                            </Button>
                          </Link>
                        </TableCell>
                        <TableCell align="left">{row.hnID}</TableCell>
                        <TableCell align="left">{`${row.firstname} ${row.lastname}`}</TableCell>
                        <TableCell align="left">{row.telephone}</TableCell>
                        <TableCell align="left">{row.email}</TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 15, 20]}
              component="div"
              count={filteredItems.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </Box>
      </Container>
    </React.Fragment>
  );
}
