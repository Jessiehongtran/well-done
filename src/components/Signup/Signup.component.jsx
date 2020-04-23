import React, { useState } from "react";
import axios from 'axios';
import './Signup.style.scss'
import "antd/dist/antd.css";
import { Form, Icon, Input, Button, Row, Col, Typography } from "antd";

const { Title } = Typography;

const SignUp = props => {
  const [user, setUser] = useState({})
  const [loading, setLoading] = useState(false)

  const handleChange = e => {
    let val = e.target.value
    if (val == "true"){
        val = true
    }
    else if (val == "false"){
        val = false
    }
    else {
        val = val
    }
    setUser({...user, [e.target.name]: val})
  }

  const handleSubmit = e => {
      e.preventDefault()
      setLoading(true)
      console.log('user', user)
      axios
      .post("https://welldone-server.herokuapp.com/api/accounts", user)
      .then(res => {
        console.log("res in signup", res.data);
        localStorage.setItem('token', res.data.token)
        props.history.push("/dashboard");
      })
      .catch(err => {
        console.log(err);
      });
  }
  

  return (
    <div className="landing">
        <Col span={24} style={{ marginBottom: "20px" , marginLeft: "50px", display: "flex", justifyContent: "flex-start", height: "75px"}}>
            <Title style={{color: "#D63D19", fontSize: "6em", textShadow: "2px 2px #FFFF", marginTop: "25px"}}>WellDone</Title>
        </Col>
        <Col span={24} style={{display: "flex", justifyContent: "center", alignItems: "center", marginTop: "5%"}}>
            <Form onSubmit={handleSubmit} style={{ maxWidth: "400px" , border: "5px solid white", padding: "20px", backgroundColor: "#EAE6E6"}}>
                <Form.Item>
                <Input 
                    type="text"
                    placeholder="First Name"
                    onChange={handleChange}
                    name="first_name"
                />
                </Form.Item>
                <Form.Item>
                <Input
                    type="text" 
                    placeholder="Last Name"
                    onChange={handleChange}
                    name="last_name"
                />
                </Form.Item>
                <Form.Item>
                <Input 
                    type="email"
                    placeholder="Email Address"
                    onChange={handleChange}
                    name="email_address"
                />
                </Form.Item>
                <Form.Item>
                <Input 
                    type="password"
                    placeholder="Password"
                    onChange={handleChange}
                    name="password"
                />
                </Form.Item>
                <Form.Item>
                <Input 
                    placeholder="Mobile Number"
                    onChange={handleChange}
                    name="mobile_number"
                />
                </Form.Item>
                <label for="super_user">Are you super user?</label>
                    <div className="radio-input">
                        <label>
                            <Input type="radio" id="super_user" name="super_user" value="true"  onChange={handleChange}/>
                            Yes
                        </label>
                        <label>
                            <Input type="radio" id="super_user" name="super_user" value="false"  onChange={handleChange} />
                            No
                        </label>
                    </div>
                <label for="org_user">Are you organization user?</label>
                    <div className="radio-input">
                        <label>
                            <Input type="radio" id="org_user" name="org_user" value="true"  onChange={handleChange}/>
                            Yes
                        </label>
                        <label>
                            <Input type="radio" id="org_user" name="org_user" value="false"  onChange={handleChange}/>
                            No 
                        </label>
                    </div>
                <label for="org_admin">Are you organization admin?</label>
                    <div className="radio-input">
                        <label>
                            <Input type="radio" id="org_admin" name="org_admin" value="true"  onChange={handleChange}/>
                            Yes
                        </label>
                        <label>
                            <Input type="radio" id="org_admin" name="org_admin" value="false"  onChange={handleChange}/>
                            No
                        </label>
                    </div>
                    {loading ? 
                    <Button type="primary" htmlType="submit" style={{ marginTop: "10px", width: "100%", backgroundColor: "#D63D19", border: "1px solid #D63D19", fontWeight: "700"}}>
                        Loading...
                    </Button> : 
                    <Button type="primary" htmlType="submit" style={{ marginTop: "10px", width: "100%", backgroundColor: "#D63D19", border: "1px solid #D63D19", fontWeight: "700"}}>
                    Sign Up
                    </Button>
                }
                    
            </Form>
        </Col>
    </div>
  );
};

export default SignUp;