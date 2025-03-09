"use client";

interface ExampleProps {
  name: string;
  surname: string;
  onClick?: (message: string) => void;
}

// props -> properties
export default function Example(props: ExampleProps) {
  console.log(props);

  return (
    <div>
      Merhaba, {props.name} {props.surname}
      <button
        onClick={() =>
          props.onClick ? props.onClick(`Merhaba ${props.name}`) : null
        }
      >
        Selamla
      </button>
    </div>
  );
}
