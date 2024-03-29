import Link from 'next/link'

import {Button} from '@chakra-ui/button'
import {Box, Flex, Heading, Text} from '@chakra-ui/layout'
import {Avatar} from '@chakra-ui/avatar'
import {Alert} from '@chakra-ui/alert'

import {formatDate} from '@/utils/misc'
import {Card} from './card'

function PostItem({post, admin = false}) {
  // Naive method to calc word count and read time
  const wordCount = post?.content.trim().split(/\s+/g).length
  const minutesToRead = (wordCount / 100 + 1).toFixed(0)

  return (
    <Card>
      <Flex alignItems="center" justifyContent="space-between" mb="2">
        <Flex>
          <Link href={`/${post.username}`}>
            <Avatar
              showBorder
              size="md"
              cursor="pointer"
              src={post.photoURL}
              name={post.username}
              mr="2"
              color="white"
              bg="teal.500"
            />
          </Link>

          <Flex flexDirection="column">
            <Text color="black" _hover={{textDecoration: 'underline'}}>
              <Link href={`/${post.username}`}>{post.username}</Link>
            </Text>

            <Text fontSize="sm" color="gray">
              {formatDate(new Date(post.createdAt))}
            </Text>
          </Flex>
        </Flex>

        {/* If admin view, show extra controls for user */}
        {admin && (
          <Flex>
            <Alert
              py="1"
              px="3"
              status={post.isPublished ? 'success' : 'warning'}
              w="auto"
              ml="auto"
              rounded="lg"
              variant="subtle"
              alignItems="center"
              justifyContent="center"
              mr="2"
              fontSize="lg"
              fontWeight="bold"
            >
              {post.isPublished ? 'Live' : 'Draft'}
            </Alert>

            <Link href={`/admin/${post.slug}`}>
              <Button color="gray" variant="outline">
                Edit
              </Button>
            </Link>
          </Flex>
        )}
      </Flex>

      <Flex flexDir="column" my="3">
        <Heading as="h4" fontSize="2xl">
          <Link href={`/${post.username}/${post.slug}`}>{post.title}</Link>
        </Heading>
      </Flex>

      <Flex color="gray" as="footer" alignItems="center" justifyContent="space-between">
        <Text>
          <Box color="gray" display="inline" as="svg" fill="currentcolor" w="4" mr="1" viewBox="0 0 512 512">
            <path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm216 248c0 118.7-96.1 216-216 216-118.7 0-216-96.1-216-216 0-118.7 96.1-216 216-216 118.7 0 216 96.1 216 216zm-148.9 88.3l-81.2-59c-3.1-2.3-4.9-5.9-4.9-9.7V116c0-6.6 5.4-12 12-12h14c6.6 0 12 5.4 12 12v146.3l70.5 51.3c5.4 3.9 6.5 11.4 2.6 16.8l-8.2 11.3c-3.9 5.3-11.4 6.5-16.8 2.6z" />
          </Box>
          {minutesToRead} min read
        </Text>

        <Box as="span">
          ❤️ {post.heartCount || 0} {post.heartCount > 1 ? 'Hearts' : 'Heart'}
        </Box>
      </Flex>
    </Card>
  )
}

export {PostItem}
