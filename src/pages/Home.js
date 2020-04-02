import React, { useState } from "react";
import { Container, Row, Col } from "reactstrap";
import UserImages from '../components/UserImages';
import LoadingIndicator from '../components/LoadingIndicator';
import "./Home.css"
import { Form, Button, Modal } from "react-bootstrap"
import { Link } from "react-router-dom"
import Image from "react-graceful-image"
import ImgSrc from "react-graceful-image";
import Comments from "../components/comments"
import ThreadLikes from "../components/threadlikes.js"

function Home({ threads, userID, isLoading, threadId }) {
  const [userImages, setUserImages] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(null);
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);



  if (isLoading) {
    return (
      <LoadingIndicator size="250px" />
    );
  }
  //   let columnUser = [];
  //   let userCopy = [...threads]
  //   while (userCopy.length) columnUser.push(userCopy.splice(0, 3));
  //   return (
  //     <Container className="UserContainer">0
  //       {
  //         columnUser.map(x => {
  //           return (
  //             <Row>
  //               {
  //                 x.map(x => {
  //                   const threadId = x.id;
  //                   return (
  //                     <Col xs={12} md={4}>
  //                       <div className="IndividCol">
  //                         <div className="ImageDiv">
  //                           <UserImages className="UserImages" threadId={threadId} userID={userID} />
  //                         </div>
  //                       </div>
  //                     </Col>
  //                   )
  //                 })
  //               }
  //             </Row>
  //           )
  //         }
  //         )
  //       }
  //     </Container>
  //   )
  // }

  return (
    threads.map(thread => {
      return (
        <>
          <Container className="userContainer">
            {/* took out the stuff in col, and restored it without bells and whistles. added styling for three rows in the home.css */}
            <Col className="userContainerCol">
              <div classname="container" id="individCol">
                <div className="imageDiv">
                  <Image id={thread.id} className="userImages" src={`https://marblesbackend.s3-ap-southeast-1.amazonaws.com/${thread.template}`} />
                </div>
                <div className="threadDiv" onClick={() => setShowModal(thread.id)}>
                  <h6 className="threadContent"><span>{thread.content}</span>
                    <div>
                      <ThreadLikes threadID={thread.id} />
                    </div>
                  </h6>
                </div>
              </div>
            </Col>
          </Container>


          <Modal show={showModal == thread.id} className="imageModal">
            <Modal.Header>
              <Button className="returnToHome" onClick={handleCloseModal}>
                Return To Home
          </Button>
            </Modal.Header>
            <Modal.Body>
              <Image id={thread[thread.id]} src={`https://marblesbackend.s3-ap-southeast-1.amazonaws.com/${thread.template}`} className="enlargedImage"></Image>
            </Modal.Body>
            <Modal.Footer>

              <div className="commentWrapperHome">
                <Comments threads={threads} threadId={thread.id} userID={userID} />
              </div>

            </Modal.Footer>
          </Modal>
        </>
      )
    })
  )
}

export default Home;