import {
  UserButton,
} from "@clerk/nextjs";

export default function Home() {
  return (
    <div>
      HI There
      <UserButton />
    </div>
  );
}
