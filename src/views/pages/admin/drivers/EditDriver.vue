<script setup>
import { RouterView, RouterLink, useRouter, useRoute } from 'vue-router';
import { baseURL } from '@/service/ApiConstant';
import { onMounted, ref } from 'vue';
import axios from 'axios';
import { useForm } from 'vee-validate';
import * as yup from 'yup';
import { useToast } from 'primevue/usetoast';
import InputText from 'primevue/inputtext';
import Dropdown from 'primevue/dropdown';

const router = useRouter();
const isLoadingDiv = ref(true);
const isLoadingButton = ref(false);
const provinces = ref([]);
const retriviedData = ref([]);
const toast = useToast();

function goBackUsingBack() {
    if (router) {
        router.back();
    }
}
const schema = yup.object({
    name: yup.string().required().label('Name'),
    license: yup.string().required().label('license'),
    mobile: yup.string().required().label('mobile'),
    // province_id: yup.string().required().label('Province')
    // email: yup.string().required().email().label('Email license'),
    // fullName: yup.string().required().label('Full name'),
    // password: yup.string().required().min(6).label('Password'),
    // passwordConfirm: yup
    //     .string()
    //     .oneOf([yup.ref('password')], 'Passwords must match')
    //     .required()
    //     .label('Password confirmation'),
    // terms: yup.boolean().required().isTrue('You must agree to terms and conditions').label('terms agreement'),
    // type: yup.string().required().label('Account type')
});

const { defineField, handleSubmit, resetForm, errors, setErrors } = useForm({
    validationSchema: schema
});

const [name] = defineField('name');
const [license] = defineField('license');
const [mobile] = defineField('mobile');
// const [province_id] = defineField('province_id');

const onSubmit = handleSubmit((values) => {
    isLoadingButton.value = true;
    axios
        .put(`${baseURL}/drivers/${router.currentRoute.value.params.id}`, values)
        .then((response) => {
            resetForm();
            router.push({ path: '/drivers' });
            toast.add({ severity: 'success', summary: `Successo`, detail: 'Registro editado com sucesso', life: 3000 });
        })
        .catch((error) => {
            isLoadingButton.value = false;
            toast.add({ severity: 'error', summary: `${error.response.data.message}`, detail: 'Detalhe da Mensagem', life: 3000 });
            if (error.response.data.errors) {
                setErrors(error.response.data.errors);
            }
        })
        .finally(() => {
            isLoadingButton.value = false;
        });
});

const getData = () => {
    axios
        .get(`${baseURL}/drivers/${router.currentRoute.value.params.id}/edit`)
        .then((response) => {
            // toast.add({ severity: 'success', summary: 'Success Message', detail: 'Message Detail', life: 3000 });
            retriviedData.value = response.data.driver;
            // provinces.value = response.data.province;

            //define models from data
            name.value = retriviedData.value.name;
            license.value = retriviedData.value.license;
            mobile.value = retriviedData.value.mobile;
            // province_id.value = retriviedData.value.province_id;

            isLoadingDiv.value = false;


        })
        .catch((error) => {
            isLoadingDiv.value = false;
            toast.add({ severity: 'error', summary: `${error}`, detail: 'Message Detail', life: 3000 });
            goBackUsingBack();
        });
};
onMounted(() => {
    getData();
});
</script>
<template>
    <div className="card" v-if="!isLoadingDiv">
        <div class="col-12">
            <div class="card-w-title">
                <Button label="Voltar" class="mr-2 mb-2" @click="goBackUsingBack"><i class="pi pi-angle-left"></i> Voltar</Button>
                <h5>Editar Motorista</h5>
            </div>

            <small class="p-error">Os campos marcados * sao considerados campos obrigatorios.</small>
            <form @submit="onSubmit">
                <div class="col-12 md:col-12">
                    <div class="card p-fluid">
                        <h5>Formulário para Editação de Motoristas</h5>

                        <div class="field">
                            <label for="name">Nome</label>
                            <InputText v-model="name" id="name" type="text" :class="{ 'p-invalid': errors.name }" />
                            <small id="name-help" class="p-error">{{ errors.name }}</small>
                        </div>
                        <div class="field">
                            <label for="license">Carta de Condução</label>
                            <InputText v-model="license" id="license" type="text" :class="{ 'p-invalid': errors.license }" />
                            <small id="license-help" class="p-error">{{ errors.license }}</small>
                        </div>
                        <div class="field">
                            <label for="mobile">Telefone</label>
                            <InputText v-model="mobile" id="mobile" type="text" :class="{ 'p-invalid': errors.mobile }" />
                            <small id="mobile-help" class="p-error">{{ errors.mobile }}</small>
                        </div>
                        <!-- <div class="field">
                            <label for="province_id">Provincia</label>
                            <Dropdown v-model="province_id" :options="provinces" optionLabel="name" optionValue="id" placeholder="Selecionar" :class="{ 'p-invalid': errors.province_id }" />
                            <small id="province_id-help" class="p-error">{{ errors.province_id }}</small>
                        </div> -->
                    </div>
                    <Button label="Submeter" class="mr-2 mb-2" @click="onSubmit" :disabled="isLoadingButton"></Button
                    ><ProgressSpinner style="width: 35px; height: 35px" strokeWidth="8" fill="var(--surface-ground)" animationDuration=".5s" aria-label="Custom ProgressSpinner" v-if="isLoadingButton" />
                </div>
            </form>
        </div>
    </div>
    <div class="text-center" v-else>
        <ProgressSpinner style="width: 50px; height: 50px" strokeWidth="8" fill="var(--surface-ground)" animationDuration=".5s" aria-label="Custom ProgressSpinner" />
        <p>Por Favor Aguarde...</p>
    </div>
</template>
