import React, { useState } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

const initialColor = {
  color: "",
  code: { hex: "" },
};

const ColorList = ({ colors, updateColors, getData }, ...props) => {
  console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const editColor = (color) => {
    setEditing(true);
    setColorToEdit(color);
  };

  const [newColor, setNewColor] = useState({ color: "", code: "" });

  const handleChange = (e) => {
    console.log("you triggerd it");
    setNewColor({
      ...newColor,
      [e.target.name]: e.target.value,
    });
  };

  const saveEdit = (e) => {
    e.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?

    axiosWithAuth()
      .put(`http://localhost:5000/api/colors/${colorToEdit.id}`, colorToEdit)
      .then((res) => {
        console.log("Got them updated colors", res);
        getData();
        setColorToEdit(initialColor);
        setEditing(false);
      })
      .catch((err) => console.error("There was an error, sorry. ", err));
  };

  const deleteColor = (color) => {
    // make a delete request to delete this color
    axiosWithAuth()
      .delete(`http://localhost:5000/api/colors/${colorToEdit.id}`)
      .then((res) => {
        console.log("Got them updated colors", res);
        setColorToEdit(initialColor);
        setEditing(false);
        getData();
      })
      .catch((err) => console.error("There was an error, sorry. ", err));
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map((color) => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span
                className="delete"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteColor(color);
                }}
              >
                x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <Button
            variant="secondary"
            onClick={() => {
              deleteColor(colorToEdit);
            }}
          >
            Delete color{" "}
          </Button>
          <br />
          <label>
            color name:
            <input
              onChange={(e) =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={(e) =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value },
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <br />
      <br />
      <Link to="/login">
        <Button
          onClick={() => {
            localStorage.removeItem("token");
          }}
        >
          SIGN OUT
        </Button>
      </Link>
      <div className="spacer" />
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        You can add a color here <br />
        <br />
        Color: <br />
        <input
          type="text"
          color="colorz"
          value={newColor.color}
          onChange={(e) => {
            handleChange(e);
          }}
        />
        <br />
        Color Hex Code: <br />
        <input
          type="text"
          name="code"
          value={newColor.code.hex}
          onChange={(e) => {
            handleChange(e);
          }}
        />
        <br />
        <br />
        <div className="buttonsContainer">
          <Button type="submit" variant="primary">
            Add New Color
          </Button>
        </div>
      </form>{" "}
    </div>
  );
};

export default ColorList;
