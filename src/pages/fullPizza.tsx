import axios from 'axios';
import { FC, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { IPizza } from '../utils/types';

const FullPizza: FC = () => {
  const [data, setData] = useState<IPizza | null>(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const { data } = await axios.get(
          `https://642008d025cb657210411d98.mockapi.io/items/${id}`,
        );
        setData(data);
      } catch (error) {
        console.log(error);
        navigate('/');
      }
    };

    fetchItem();
  }, [id, navigate]);

  if (!data) {
    return <h2>Нет данных!</h2>;
  }

  return (
    <div className="container">
      <img className="pizza-block__image" src={data.imageUrl} alt="Pizza" />
      <div>
        <h4 className="pizza-block__title">{data.title}</h4>
        <div className="pizza-block__price">{data.price} ₽</div>
      </div>
    </div>
  );
};

export default FullPizza
