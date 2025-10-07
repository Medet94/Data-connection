export const getConnectionById = async (id: string): Promise<Connection> => {
  const response = await dataConnectionApi.get(`/api/v1/Connection/${id}`);
  return response.data.data;
};
