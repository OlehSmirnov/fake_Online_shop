import React, {useState} from "react"
import Card from "react-bootstrap/Card"
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"
import {Link} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux"

import styles from "../../styles/product-card/product_card.module.css"
import {getCartItems, addCartItem, setShowCart} from "../../redux/appSlice"

const ProductCard = ({id, image, title, price, rating}) => {

  const dispatch = useDispatch()
  const cartItems = useSelector(getCartItems)
  const [isFavorite, setIsFavorite] = useState(false)

  const addToCart = () => {
    if (isItemAdded()) {
      dispatch(setShowCart(true))
    } else {
      dispatch(addCartItem({count: 1, id, title, price, image}))
    }
  }

  const handleFavorite = () => {
    setIsFavorite(prevState => !prevState)
  }

  const isItemAdded = () => cartItems.filter(item => item.id == id).length !== 0

  return (
    <Col>
      <Card className={styles.card}>
        <Link to={`products/${id}`}>
          <div className={styles.image_container}>
            <Card.Img className={styles.image} variant="top" src={image}/>
          </div>
        </Link>
        <Card.Body className={styles.card_body}>
          <Card.Text className={styles.title}>
            <Link to={`products/${id}`}>{title}</Link>
          </Card.Text>
          <Button className={styles.card_favorite} onClick={handleFavorite}>
            {isFavorite
              ?
              <i className="fa-solid fa-heart"/>
              :
              <i className="fa-regular fa-heart"/>
            }

          </Button>
          <span className={styles.span}><i className="fa-solid fa-star"/>{rating.rate} ({rating.count})</span>
          <Card.Subtitle className={styles.card_subtitle}>${price}
            <Button onClick={addToCart}>
              {isItemAdded()
                ?
                <i className="fa-solid fa-check"/>
                :
                <i className="fa-solid fa-cart-arrow-down cart"/>}
            </Button>
          </Card.Subtitle>
        </Card.Body>
      </Card>
    </Col>
  )
}

export default ProductCard