
'use client';
import { Tooltip,Stack, Skeleton, Container } from '@chakra-ui/react';

export default function Home() {
  return (
    <main >
      <div >
        <Tooltip label='Phone number' fontSize='md'>
        <Stack>
          <Skeleton height='20px' />
          <Skeleton height='20px' />
          <Skeleton height='20px' />
          <Container>
  There are many benefits to a joint design and development system. Not only
  does it bring benefits to the design team, but it also brings benefits to
  engineering teams. It makes sure that our experiences have a consistent look
  and feel, not just in our design specs, but in production
</Container>
        </Stack>
        </Tooltip>       
      </div>
    </main>
  )
}
