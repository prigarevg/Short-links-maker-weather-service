import React, { useContext } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { Layout, Menu, Breadcrumb } from "antd";
import styles from "../components/PageWrapper.module.css";

const { Header, Content, Footer } = Layout;

export const Navbar = () => {
  const history = useHistory();
  const auth = useContext(AuthContext);
  const logoutHandler = (event) => {
    event.preventDefault();
    auth.logout();
    history.push("/");
  };
  return (
    <Layout className="layout">
      <Header>
        <div className="logo" />

        <Menu theme="dark" mode="horizontal" >
          <Menu.Item key="1"><NavLink to="/create">Создать</NavLink></Menu.Item>
          <Menu.Item key="2"><NavLink to="/links">Ссылки</NavLink></Menu.Item>
          <Menu.Item key="3"><NavLink to="/map">Карта</NavLink></Menu.Item>
          <Menu.Item key="4"><NavLink to="/analysis">Аналитика</NavLink></Menu.Item>
          <a className={styles.a} href="/" onClick={logoutHandler}>
            Выйти
          </a>
        </Menu>
      </Header>
     
     
    </Layout>
  );
};

/*
 <Footer style={{ textAlign: "center" }}>
        Ant Design ©2021 Created by Evgeny Prigarin
      </Footer>
*/

/*
<Layout className={styles.layout}>
      <Header className={styles.header}>
       
          <Link to="/">Home</Link>

    
          
        
      </Header>
      <Content className={styles.content}>
      
      </Content>
      <Footer className={styles.footer}>
      <Footer style={{ textAlign: 'center' }}>Developed by Evgeny Prigarin</Footer>
      </Footer>
    </Layout>
*/
