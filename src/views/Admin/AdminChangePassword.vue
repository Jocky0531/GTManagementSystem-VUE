<template>
    <ChangePassword updatapasswordurl="/admins/updataadminpassword"></ChangePassword>
</template>

<script>
    import ChangePassword from "@/components/ChangePassword";

    export default {
        name: "AdminChangePassword",
        components:{
            ChangePassword
        }

    }
</script>

<style scoped>

</style>