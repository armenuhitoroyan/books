import { Button, Box, Modal, TextField } from "@mui/material"
import { useState } from "react"
import { type SubmitHandler, useForm } from "react-hook-form"
import { useAppDispatch } from "../../app/hooks"
import { addBook } from "./book.slice"

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgColor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
}

interface Inputs {
  title: string
  author: string
  rating: number
  photo: string
}

const AddBook: React.FC = () => {
  const dispatch = useAppDispatch()
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const handleAdd: SubmitHandler<Inputs> = data => {
    console.log(data)
    dispatch(addBook(data))
    reset()
    setIsOpen(false)
  }
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>()
  return (
    <>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button
          style={{ marginTop: "20px" }}
          variant="contained"
          onClick={() => setIsOpen(true)}
        >
          Add Book
        </Button>
        <Modal
          style={{ background: "white" }}
          open={isOpen}
          onClose={() => setIsOpen(false)}
        >
          <Box sx={{ ...style, width: 400 }}>
            <h2>Add new book</h2>
            <form onSubmit={handleSubmit(handleAdd)}>
              <Box>
                {errors.title && (
                  <p style={{ color: "red" }}>Please fill the title</p>
                )}
                <TextField
                  label="title"
                  variant="outlined"
                  {...register("title", { required: true })}
                />
              </Box>
              <Box my={2}>
                {errors.author && (
                  <p style={{ color: "red" }}>Please fill author's name</p>
                )}
                <TextField
                  label="author"
                  variant="outlined"
                  {...register("author", { required: true })}
                />
              </Box>
              <Box my={2}>
                {errors.rating && (
                  <p style={{ color: "red" }}>{errors.rating.message}</p>
                )}
                <TextField
                  label="rating"
                  variant="outlined"
                  type="number"
                  {...register("rating", {
                    required: "Rating must be a number",
                    valueAsNumber: true, // Սա ստիպում է, որ արժեքը ընկալվի որպես թիվ
                    min: {
                      value: 1,
                      message: "Minimum rating is 1",
                    },
                    max: {
                      value: 5,
                      message: "Maximum rating is 5",
                    },
                  })}
                />
              </Box>
              <Box my={2}>
                {errors.photo && (
                  <p style={{ color: "red" }}>Please fill photo url</p>
                )}
                <TextField
                  label="photo"
                  variant="outlined"
                  {...register("photo", { required: true })}
                />
              </Box>
              <Button type="submit" variant="contained">
                Save
              </Button>
            </form>
          </Box>
        </Modal>
      </div>
    </>
  )
}

export default AddBook
