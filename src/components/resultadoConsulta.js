import styled from 'styled-components';
import { FiUser, FiPhone, FiMail } from 'react-icons/fi'; 

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  
`;

const ContentContainer = styled.div`
  width: 90%;
  max-width: 1200px;
  background-color: #f8f8f8;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  max-height: 400px;
  overflow-y: auto;
`;

const Card = styled.div`
  background-color: #ffffff;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
`;

const CardContent = styled.div`
  padding: 16px;
`;

const Image = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 8px 8px 0 0;
`;

const Icon = styled.span`
  margin-right: 8px;
  font-size: 18px;
`;

const Text = styled.p`
  margin: 0;
  color: ${(props) => props.color || '#000000'};
`;

const PersonCard = ({ listOfPersons }) => (
  <Container>
    <ContentContainer>
      <GridContainer>
        {listOfPersons.map((person, index) => (
          <Card key={index}>
            <Image src={person.imagen} alt={`Imagen de ${person.nombre}`} />
            <CardContent>
              <Text color="#333">
                <Icon as={FiUser} /> {person.nombre} {person.apellido}
              </Text>
              <Text color="#555">
                <Icon as={FiPhone} /> {person.telefono}
              </Text>
              <Text color="#777">
                <Icon as={FiMail} /> {person.correo}
              </Text>
            </CardContent>
          </Card>
        ))}
      </GridContainer>
    </ContentContainer>
  </Container>
);

export default PersonCard;