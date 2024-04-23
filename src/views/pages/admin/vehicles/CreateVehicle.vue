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
const trelas = ref([]);
const toast = useToast();

function goBackUsingBack() {
    if (router) {
        router.back();
    }
}
const schema = yup.object({
    name: yup.string().required().trim().label('Name'),
    plate: yup.string().required().trim().label('plate'),
    max_load: yup.string().required().trim().label('max_load'),
    trela_id: yup.string().required().label('Trela')
    // email: yup.string().required().email().label('Email plate'),
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
const [plate] = defineField('plate');
const [max_load] = defineField('max_load');
const [trela_id] = defineField('trela_id');

const onSubmit = handleSubmit((values) => {
    isLoadingButton.value = true;
    axios
        .post(`${baseURL}/vehicles`, values)
        .then((response) => {
            resetForm();
            router.push({ path: '/vehicles' });
            toast.add({ severity: 'success', summary: `Successo`, detail: 'Motorista criado com sucesso', life: 3000 });
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

const getTrela = () => {
    axios
        .get(`${baseURL}/trelas`)
        .then((response) => {
            // toast.add({ severity: 'success', summary: 'Success Message', detail: 'Message Detail', life: 3000 });
            trelas.value = response.data.trela;
            isLoadingDiv.value = false;
        })
        .catch((error) => {
            isLoadingDiv.value = false;
            toast.add({ severity: 'error', summary: `${error}`, detail: 'Message Detail', life: 3000 });
            goBackUsingBack();
        });
};
onMounted(() => {
    getTrela();
});
</script>
<template>
    <div className="card" v-if="!isLoadingDiv">
        <div class="col-12">
            <div class="card-w-title">
                <Button label="Voltar" class="mr-2 mb-2" @click="goBackUsingBack"><i class="pi pi-angle-left"></i> Voltar</Button>
                <h5>Criar Veículo</h5>
            </div>

            <small class="p-error">Os campos marcados * sao considerados campos obrigatorios.</small>
            <form @submit="onSubmit">
                <div class="col-12 md:col-12">
                    <div class="card p-fluid">
                        <h5>Formulário Criação de Veículos</h5>

                        <div class="field">
                            <label for="name">Nome</label>
                            <InputText v-model="name" id="name" type="text" :class="{ 'p-invalid': errors.name }" />
                            <small id="name-help" class="p-error">{{ errors.name }}</small>
                        </div>
                        <div class="field">
                            <label for="plate">Matrícula</label>
                            <InputText v-model="plate" id="plate" type="text" :class="{ 'p-invalid': errors.plate }" />
                            <small id="plate-help" class="p-error">{{ errors.plate }}</small>
                        </div>
                        <div class="field">
                            <label for="max_load">Capacidade Máxima</label>
                            <InputText v-model="max_load" id="max_load" type="text" :class="{ 'p-invalid': errors.max_load }" />
                            <small id="max_load-help" class="p-error">{{ errors.max_load }}</small>
                        </div>
                        <div class="field">
                            <label for="trela_id">Trela</label>
                            <Dropdown v-model="trela_id" :options="trelas" optionLabel="name" optionValue="id" placeholder="Selecionar" :class="{ 'p-invalid': errors.trela_id }" />
                            <small id="trela_id-help" class="p-error">{{ errors.trela_id }}</small>
                        </div>
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
