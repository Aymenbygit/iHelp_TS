import  { useState } from "react";
import { Button, Card,  Form } from "react-bootstrap";

const Trye = () => {
  const [fade, setFade] = useState<boolean>(false);
  const handleFade = (e: any) => {
    setFade(!fade);
  };
  return (
    <div className="container">
      {/* <Fade direction="up">
        <p>I enter first...</p>
        <p>...then comes my turn...</p>
        <p>...and finally you see me!</p>
      </Fade> */}
      <button
        style={{ marginTop: "20px", marginBottom: "20px" }}
        className="btn btn-primary"
        type="button"
        onClick={handleFade}
      >
        {fade ? (
          <>Cancel</>
        ) : (
          <>
            {" "}
            <i className="fas fa-plus"></i> New Post
          </>
        )}
      </button>
      {/* <div className="animate__animated animate__fadeInUp">Example</div> */}
      <div>
        {fade && (
          <>
            <Card style={{ marginBottom: "30px" }} className="animate__animated animate__fadeInUp ">
                <Form
                  style={{
                    marginLeft: "5%",
                    marginRight: "5%",
                    marginBottom: "1%",
                    marginTop: "1%",
                  }}
                >
                  <Form.Group>
                    <Form.Label as="h5">Title</Form.Label>
                    <Form.Control
                      placeholder="any question..."
                      type="text"
                      name="title"
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label as="h5">Upload Images :</Form.Label>
                    <Form.Control
                      type="file"
                      name="gallery"
                      multiple
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label as="h5">Body</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={6}
                      type="text"
                      placeholder="description"
                      name="description"
                    />
                  </Form.Group>
                  
                  <Button
                      style={{ cursor: "not-allowed" }}
                      variant="primary"
                      disabled
                    >
                      Post
                    </Button>
                  &nbsp;
                  <Button
                    variant="info"
                  >
                    Reset
                  </Button>
                </Form>
              </Card>
          </>
        )}
      </div>
    </div>
  );
};

export default Trye;
