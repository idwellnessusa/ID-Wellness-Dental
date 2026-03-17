import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function ReferralCatcher() {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      localStorage.setItem('referral_id', id);
    }
    navigate('/', { replace: true });
  }, [id, navigate]);

  return null;
}
