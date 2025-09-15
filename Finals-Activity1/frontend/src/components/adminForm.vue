<template>
  <section class="form-container">
    <h2>Admin Form</h2>
    <form>
      <label>Admin ID:</label>
      <input type="text" />

      <label>First Name:</label>
      <input type="text" />

      <label>Last Name:</label>
      <input type="text" />

      <label>Department:</label>
      <input type="text" />

      <label>Username:</label>
      <input type="text" />

      <label>Select File:</label>
      <input type="file" />

      <button type="submit">Submit and Upload File</button>
    </form>
  </section>
</template>

<script>
export default {
  name: "AdminForm",
};
</script>
