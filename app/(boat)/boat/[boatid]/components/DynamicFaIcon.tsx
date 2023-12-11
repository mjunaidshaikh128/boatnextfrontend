import * as Icons from 'react-icons/fa';

const DynamicFaIcon = ({ name }: any) => {
    const IconComponent = Icons[name as keyof typeof Icons];

  if (!IconComponent) { // Return a default one
    return <Icons.FaAngellist />;
  }

  return <IconComponent />;

}

export default DynamicFaIcon