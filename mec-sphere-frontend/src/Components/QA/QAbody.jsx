import React from 'react'
import { Button, Container, Flex, HStack, Image, Input, VStack,Text,useDisclosure, border, Link} from '@chakra-ui/react';
import {useState} from 'react'
import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function QAbody() {
   
  return (
   <Flex alignItems={'center'} justifyContent={'center'} mt={12}>
    <Flex gap={10}>
     <Card  maxW='sm' maxH='lg' >
      <CardHeader>
        
      <Image w={'60px'} h={'60px'} marginTop={-35} marginRight={20}  borderRadius={50} src='https://people.com/thmb/4nQ7-MjL_jCoW-JofmlUcCHabJs=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():focal(599x0:601x2):format(webp)/new-dad-ed-sheeran-44dcff70fc8a40b1be722788d8253c25.jpg'>
      </Image>
      <Flex direction={'column'} gap={5}  >
      <Text fontSize={10} >Yesturday</Text>

      <Text fontSize={18} fontFamily={'cursive'} textAlign={'center'}>What will drinking one cup of green tea a day do to my health?</Text>
      </Flex>

      </CardHeader>
      <CardBody>
        As an owner of tea business for eight running now, I get asked this question and like it all the time.People want me to recommend a tea to cure their cancer,halitosis,premature balding and tennis
      </CardBody>
     </Card>
     <Card  maxW='sm' maxH='lg' >
      <CardHeader>
        
      <Image w={'60px'} h={'60px'} marginTop={-35} marginRight={20}  borderRadius={50} src='https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'>
      </Image>
      <Flex direction={'column'} gap={5}  >
      <Text fontSize={10} >Yesturday</Text>
      <Text fontSize={18} fontFamily={'cursive'} textAlign={'center'}>What will drinking one cup of green tea a day do to my health?</Text>
      </Flex>

      </CardHeader>
      <CardBody>
      As an owner of tea business for eight running now, I get asked this question and like it all the time.People want me to recommend a tea to cure their cancer,halitosis,premature balding and tennis

      </CardBody>
      <CardFooter>
        <Button id='btnh2' className='btn' style={{
          background:'transparent',
          border:'none',
          fontSize:'88px',
          outline:'none',

        }}>
         <i class="fa-thin fa-heart"></i>
        </Button>
      </CardFooter>
     </Card>
    </Flex>
   </Flex>
  )
}

export default QAbody