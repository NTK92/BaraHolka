import React,{Component} from "react";
import {Container} from "reactstrap";
import "./FooterStyle.css"

const styles = {
    container: {
        width: 'auto',
        maxWidth: '680px',
        padding: '0 15px',
        margin: '0'
    },
    footer: {
        marginBottom: '0 !imporant',
        },
}

export class Footer extends Component {
    render() {
        return(
            <div>
                <div className="footer-basic">
                    <footer>
                        <div className="social">
                            <a href="#"><i className="icon ion-social-instagram"></i></a>
                            <a href="#"><i className="icon ion-social-snapchat"></i></a>
                            <a href="#"><i className="icon ion-social-twitter"></i></a>
                            <a href="#"><i className="icon ion-social-facebook"></i></a>
                        </div>
                        <ul className="list-inline">
                            <li className="list-inline-item"><a href="#">Home</a></li>
                            <li className="list-inline-item"><a href="#">Services</a></li>
                            <li className="list-inline-item"><a href="#">About</a></li>
                            <li className="list-inline-item"><a href="#">Terms</a></li>
                            <li className="list-inline-item"><a href="#">Privacy Policy</a></li>
                        </ul>
                        <p className="copyright">Bara Holka © 2022</p>
                    </footer>
                </div>
                
            
                
            </div>
        )
    }
}

// footer style={styles.footer} className="d-flex flex-wrap justify-content-between align-items-center py-3 border-top bg-secondary">