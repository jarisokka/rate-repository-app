import { useMutation } from '@apollo/client';
import { CREATE_REVIEW } from '../graphql/mutations'

const useCreateReview = () => {
  const [mutate, result] = useMutation(CREATE_REVIEW, { fetchPolicy: 'no-cache' });

  const createReview = async ({ repositoryName, ownerName, rating, text }) => {
    const { data } = await mutate({ variables: { repositoryName, ownerName, rating: Number(rating), text } });
    return data.createReview.repositoryId;
  };

  return [createReview, result];
};

export default useCreateReview;