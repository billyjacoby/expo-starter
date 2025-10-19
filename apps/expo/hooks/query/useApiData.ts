import { queryOptions, useQuery } from '@tanstack/react-query';

const options = queryOptions({
  queryKey: ['api-data'],
  queryFn: () =>
    fetch('https://pokeapi.co/api/v2/pokemon').then((res) => res.json()),
});

export function useApiData() {
  return useQuery(options);
}
