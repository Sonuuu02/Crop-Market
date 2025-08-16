import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Button,
  TextField,
  Typography,
  MenuItem,
  InputLabel,
  FormControl,
  Select,
  Box,
  FormHelperText,
} from "@mui/material";
import { mainCategory } from "../../../data/category/mainCategory";

import { useAppDispatch } from "../../../Redux Toolkit/Store";
import { updateHomeCategory } from "../../../Redux Toolkit/Admin/AdminSlice";
import { HomeCategory } from "../../../types/homeDataTypes";
import { fruitLevelTwo } from "../../../data/category/level two/fruitLevelTwo";
import { vegetableLevelTwo } from "../../../data/category/level two/vegetableLevelTwo";
import { seedLevelThree } from "../../../data/category/level three/seedLevelThree";
import { spiceLevelTwo } from "../../../data/category/level two/spiceLevelTwo";
import { seedLevelTwo } from "../../../data/category/level two/seedLevelTwo";
import { fruitLevelThree } from "../../../data/category/level three/fruitLevelThree";
import { vegetableLevelThree } from "../../../data/category/level three/vegetableLevelThree";
import { spiceLevelThree } from "../../../data/category/level three/spiceLevelThree";

// Define validation schema using Yup
const validationSchema = Yup.object({
  image: Yup.string().required("Image is required"),
  category: Yup.string().required("Category is required"),
});

const categoryTwo: { [key: string]: any[] } = {
  fruit: fruitLevelTwo,
  vegetable: vegetableLevelTwo,
  seed: seedLevelTwo,
  spice: spiceLevelTwo,
};

const categoryThree: { [key: string]: any[] } = {
  fruit: fruitLevelThree,
  vegetable: vegetableLevelThree,
  seed: seedLevelThree,
  spice: spiceLevelThree,
};

const UpdateHomeCategoryForm = ({
  category,
  handleClose,
}: {
  category: HomeCategory | undefined;
  handleClose: () => void;
}) => {
  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues: {
      image: "",
      category: "",
      category2: "",
      category3: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      if (category?.id) {
        dispatch(
          updateHomeCategory({
            id: category.id,
            data: { image: values.image, categoryId: values.category3 },
          })
        );
      }
      handleClose();
    },
  });

  // Get the selected main category key (e.g. "fruit") from its categoryId
  const selectedMainCategory = mainCategory.find(
    (item) => item.categoryId === formik.values.category
)?.name?.toLowerCase();

  const childCategory = (category: any, parentCategoryId: any) => {
    return category.filter((child: any) => {
      return child.parentCategoryId == parentCategoryId;
    });
  };

  return (
    <Box
      component="form"
      onSubmit={formik.handleSubmit}
      sx={{ maxWidth: 500, margin: "auto", padding: 3 }}
      className="space-y-6"
    >
      <Typography variant="h4" gutterBottom>
        Update Category
      </Typography>

      {/* Image Field */}
      <TextField
        fullWidth
        id="image"
        name="image"
        label="Image URL"
        value={formik.values.image}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.image && Boolean(formik.errors.image)}
        helperText={formik.touched.image && formik.errors.image}
      />

      {/* Main Category */}
      <FormControl
        fullWidth
        error={formik.touched.category && Boolean(formik.errors.category)}
        required
      >
        <InputLabel id="category-label">Main Category</InputLabel>
        <Select
          labelId="category-label"
          id="category"
          name="category"
          value={formik.values.category}
          onChange={(e) => {
            formik.setFieldValue("category", e.target.value);
            formik.setFieldValue("category2", "");
            formik.setFieldValue("category3", "");
          }}
          label="Main Category"
        >
          {mainCategory.map((item) => (
            <MenuItem key={item.categoryId} value={item.categoryId}>
              {item.name}
            </MenuItem>
          ))}
        </Select>
        {formik.touched.category && formik.errors.category && (
          <FormHelperText>{formik.errors.category}</FormHelperText>
        )}
      </FormControl>

      {/* Second Category */}
      <FormControl fullWidth>
        <InputLabel id="category2-label">Second Category</InputLabel>
        <Select
          labelId="category2-label"
          id="category2"
          name="category2"
          value={formik.values.category2}
          onChange={(e) => {
            formik.setFieldValue("category2", e.target.value);
            formik.setFieldValue("category3", "");
          }}
          label="Second Category"
        >
          {selectedMainCategory &&
            categoryTwo[selectedMainCategory]?.map((item) => (
              <MenuItem key={item.categoryId} value={item.categoryId}>
                {item.name}
              </MenuItem>
            ))}
        </Select>
      </FormControl>

      {/* Third Category */}
      <FormControl fullWidth>
        <InputLabel id="category3-label">Third Category</InputLabel>
        <Select
          labelId="category3-label"
          id="category3"
          name="category3"
          value={formik.values.category3}
          onChange={formik.handleChange}
          label="Third Category"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {selectedMainCategory &&
            formik.values.category2 &&
            childCategory(
              categoryThree[selectedMainCategory],
              formik.values.category2
            )?.map((item: any) => (
              <MenuItem key={item.categoryId} value={item.categoryId}>
                {item.name}
              </MenuItem>
            ))}
        </Select>
      </FormControl>

      {/* Submit Button */}
      <Button
        color="primary"
        variant="contained"
        fullWidth
        type="submit"
        sx={{ py: ".9rem" }}
      >
        Submit
      </Button>
    </Box>
  );
};

export default UpdateHomeCategoryForm;