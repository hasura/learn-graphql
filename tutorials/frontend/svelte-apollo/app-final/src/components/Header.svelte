<script>
  import { Navbar, NavbarBrand } from "sveltestrap";
  import LogoutBtn from "./Auth/LogoutBtn.svelte";
</script>

<Navbar color="light" light>
  <NavbarBrand>GraphQL Tutorial App</NavbarBrand>
  <LogoutBtn />
</Navbar>
